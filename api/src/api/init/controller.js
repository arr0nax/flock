 import Boom from 'boom';
import Bcrypt from 'bcryptjs';
import User from '../../models/user';
import Group from '../../models/group';
import Post from '../../models/post';
import React from '../../models/react';
import Attachment from '../../models/attachment';
import Topic from '../../models/topic';

const CONTROLLER = 'InitController';

class InitController {

  async init(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await Group.findByID(user.attributes.group_id);
      const users = await group.getUsers();
      const topic = await Topic.findByID(group.attributes.topic_id)

      // const count = await Group.size(1);
      const posts = await group.fetchAllPosts();
      // let comments = [];
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

      nestedPostReacts.forEach(reactGroup => {
          if (reactGroup.length) {
              post_reacts[reactGroup[0].item_id] = reactGroup
          }
      })


      nestedComments.forEach(commentGroup => {
          // comments[comment]
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

      nestedReplyReacts.forEach(reactGroup => {
          if (reactGroup.length) {
              reply_reacts[reactGroup[0].item_id] = reactGroup
          }
      })


      //////////// comment attachments
      const nestedReplyAttachments = await Promise.all(replies_array.map(reply => {
          // reply_attachments[reply.id] = {};
          return Attachment.byReply(reply.id)
      }))

      nestedReplyAttachments.forEach(attachmentGroup => {
          if (attachmentGroup[0] && attachmentGroup[0].item_id) {
          }
      })


      // const comments = await user.getComments();
      // const replies = await user.getReplies();

      return { group, users, topic, posts: posts.models, comments, replies, pagination: posts.pagination, post_reacts, comment_reacts, reply_reacts, comment_attachments, reply_attachments };
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new InitController();
