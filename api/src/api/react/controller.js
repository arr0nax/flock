import Boom from 'boom';
import React from '../../models/react';
import Post from '../../models/post';
import Comment from '../../models/comment';
import Reply from '../../models/reply';
import Notification from '../../models/notification';

const CONTROLLER = 'ReactController';

class ReactController {
  async create(request) {
    try {
      let react = await new React({
        user_id: request.auth.credentials.user_id,
        item_type: request.payload.item_type,
        item_id: request.payload.item_id
      }).fetch();

      console.log(react);

      if (react && (react.attributes.react === request.payload.react)) {
        react.destroy();
      } else if (react) {
        react
          .save({react: request.payload.react}, {patch: true})
      } else {
        react = await React.create({
          react: request.payload.react,
          user_id: request.auth.credentials.user_id,
          item_type: request.payload.item_type,
          item_id: request.payload.item_id,
        });
      }

      //////Notification
      switch(request.payload.item_type) {
        case 'post':
          const post = await Post.findByID(request.payload.item_id);
          const postUser = post.attributes.user_id;
          Notification.create({
            item_id: react.attributes.id,
            item_type: 'react',
            user_id: postUser,
            parent_id: post.attributes.id,
            parent_type: request.payload.item_type,
            made_by: request.auth.credentials.user_id,
          });
          break;
        case 'comment':
          const comment = await Comment.findByID(request.payload.item_id);
          const commentUser = comment.attributes.user_id;
          Notification.create({
            item_id: react.attributes.id,
            item_type: 'react',
            user_id: commentUser,
            parent_id: comment.attributes.id,
            parent_type: request.payload.item_type,
            made_by: request.auth.credentials.user_id,
          });
          break;
        case 'reply':
          const reply = await Reply.findByID(request.payload.item_id);
          const replyUser = reply.attributes.user_id;
          Notification.create({
            item_id: react.attributes.id,
            item_type: 'react',
            user_id: replyUser,
            parent_id: reply.attributes.id,
            parent_type: request.payload.item_type,
            made_by: request.auth.credentials.user_id,
          });
          break;
      }

      return react;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return React.updateById(request.params.id, {
        react: request.payload.react
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return React.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchPostReacts(request) {
    try {
      return React.byPost(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchCommentReacts(request) {
    try {
      return React.byComment(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchReplyReacts(request) {
    try {
      return React.byReply(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReactController();
