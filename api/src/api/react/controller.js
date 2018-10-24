import Boom from 'boom';
import React from '../../models/react';

const CONTROLLER = 'ReactController';

class ReactController {
  async create(request) {
    try {
      const react = await React.create({
        react: request.payload.react,
        user_id: request.auth.credentials.user_id,
        item_type: request.payload.item_type,
        item_id: request.payload.item_id,
      });
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
