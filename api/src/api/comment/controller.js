import Boom from 'boom';
import Comment from '../../models/comment';
import Post from '../../models/post';

const CONTROLLER = 'CommentController';

class CommentController {
  async create(request) {
    try {
      const comment = await Comment.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        post_id: request.params.id
      });
      return comment;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      // const post = await Post.findByID(request.params.id);
      // console.log(post);
      return Comment.byPost(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new CommentController();
