import Boom from 'boom';
import Post from '../../models/post';
import User from '../../models/user';
import Group from '../../models/group';
import React from '../../models/react';
import Attachment from '../../models/attachment';




const CONTROLLER = 'PostController';

class PostController {
  async create(request) {
    try {
      const forbidden = await Post.findForbidden(request.payload.text);
      if (forbidden) return Boom.forbidden('Post contains restricted language');
      const user = await User.findByID(request.auth.credentials.user_id);
      const post = await Post.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        group_id: user.attributes.group_id,
        interactions: 1,
        reported: false,
      });
      return post;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Post.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Post.updateById(request.params.id, {
        text: request.payload.text,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await Group.findByID(user.attributes.group_id);
      const posts = await group.fetchAllPosts(request.query);

      let post_reacts = {};

      let comments_array = [];
      let comments = {};
      let comment_reacts = {};
      let comment_attachments = {};

      let replies_array = [];
      let replies = {};
      let reply_reacts = {};
      let reply_attachments = {};



      const nestedComments = await Promise.all(posts.map(post => {
          comments[post.id] = [];
          return post.getComments()
      }))

      const nestedPostReacts = await Promise.all(posts.map(post => {
          post_reacts[post.id] = [];
          return React.byPost(post.id)
      }))
      // console.log('---------------nestedPostReacts----------------');
      // console.log(nestedPostReacts);
      // console.log('---------------nestedPostReacts----------------');

      nestedPostReacts.forEach(reactGroup => {
          if (reactGroup.length) {
              post_reacts[reactGroup[0].item_id] = reactGroup
          }
      })

      // console.log('---------------post_reacts----------------');
      // console.log(post_reacts);
      // console.log('---------------post_reacts----------------');

      nestedComments.forEach(commentGroup => {
          // comments[comment]
          // console.log('commnetgroup', commentGroup);
          commentGroup.forEach(comment => {

              comments[comment.attributes.post_id].push(comment)
              replies[comment.attributes.id] = [];
              comments_array.push(comment)

          })
      })


      //////////// comment reacts
      const nestedCommentReacts = await Promise.all(comments_array.map(comment => {
          comment_reacts[comment.id] = [];
          return React.byComment(comment.id)
      }))

      nestedCommentReacts.forEach(reactGroup => {
          if (reactGroup.length) {
              comment_reacts[reactGroup[0].item_id] = reactGroup
          }
      })


      //////////// comment attachments
      const nestedCommentAttachments = await Promise.all(comments_array.map(comment => {
          // comment_attachments[comment.id] = {};
          return Attachment.byComment(comment.id)
      }))

      nestedCommentAttachments.forEach(attachmentGroup => {
          if (attachmentGroup[0] && attachmentGroup[0].item_id) {
              comment_attachments[attachmentGroup[0].item_id] = attachmentGroup[0]; // uses first attachment, but maybe there is a way to not do this as an array? console.log("clayton 2/16/2020, 8:42:12 PM", )
          }
      })



      const nestedReplies = await Promise.all(comments_array.map(comment => comment.getReplies()))

      nestedReplies.forEach(replyGroup => replyGroup.forEach(reply => {
          replies[reply.attributes.comment_id].push(reply)
          replies_array.push(reply);
      }))

      const nestedReplyReacts = await Promise.all(replies_array.map(reply => {
          reply_reacts[reply.id] = [];
          return React.byReply(reply.id)
      }))
      // console.log('---------------nestedReplyReacts----------------');
      // console.log(nestedReplyReacts);
      // console.log('---------------nestedReplyReacts----------------');

      nestedReplyReacts.forEach(reactGroup => {
          if (reactGroup.length) {
              reply_reacts[reactGroup[0].item_id] = reactGroup
          }
      })

      // console.log('---------------reply_reacts----------------');
      // console.log(reply_reacts);
      // console.log('---------------reply_reacts----------------');

      //////////// comment attachments
      const nestedReplyAttachments = await Promise.all(replies_array.map(reply => {
          // reply_attachments[reply.id] = {};
          return Attachment.byReply(reply.id)
      }))

      nestedReplyAttachments.forEach(attachmentGroup => {
          if (attachmentGroup[0] && attachmentGroup[0].item_id) {
              reply_attachments[attachmentGroup[0].item_id] = attachmentGroup[0]; // uses first attachment, but maybe there is a way to not do this as an array? console.log("clayton 2/16/2020, 8:42:12 PM", )
          }
      })
      return {posts: posts.models, comments, replies, pagination: posts.pagination, post_reacts, comment_reacts, reply_reacts, comment_attachments, reply_attachments}

    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchOne(request)  {
    return Post.findByID(request.params.id)
  }

}

module.exports = new PostController();
