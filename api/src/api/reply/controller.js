import Boom from 'boom';
import Comment from '../../models/comment';
import Reply from '../../models/reply';

const CONTROLLER = 'ReplyController';

class ReplyController {
  async create(request) {
    try {
      const reply = await Reply.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        comment_id: request.params.comment_id
      });
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
      // const post = await Post.findByID(request.params.id);
      // console.log(post);
      return Reply.byComment(request.params.comment_id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new ReplyController();
