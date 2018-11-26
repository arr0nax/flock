import Boom from 'boom';
import Comment from '../../models/comment';
import Post from '../../models/post';
import Notification from '../../models/notification';

const CONTROLLER = 'CommentController';

class CommentController {
  async create(request) {
    try {
      const comment = await Comment.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        post_id: request.params.id
      });
      const post = await Post.findByID(request.params.id);
      const postUser = post.attributes.user_id;
      console.log(comment, post);
      Notification.create({
        item_id: comment.attributes.id,
        item_type: 'comment',
        parent_id: request.params.id,
        parent_type: 'post',
        user_id: postUser,
        made_by: request.auth.credentials.user_id,
      })
      return comment;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Comment.updateById(request.params.id, {
        text: request.payload.text,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Comment.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      const post = await Post.findByID(request.params.id);
      return post.getComments();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new CommentController();
