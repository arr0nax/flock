import Boom from 'boom';
import Comment from '../../models/comment';
import Notification from '../../models/notification';
import Reply from '../../models/reply';

const CONTROLLER = 'ReplyController';

class ReplyController {
  async create(request) {
    try {
      const reply = await Reply.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        comment_id: request.params.id
      });
      const comment = await Comment.findByID(request.params.id);
      const commentUser = comment.attributes.user_id;
      Notification.create({
        item_id: reply.attributes.id,
        item_type: 'reply',
        user_id: commentUser,
        parent_id: request.params.id,
        parent_type: 'comment',
        made_by: request.auth.credentials.user_id,
      })
      return reply;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Reply.updateById(request.params.id, {
        text: request.payload.text,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Reply.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      const comment = await Comment.findByID(request.params.id);
      return comment.getReplies();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReplyController();
