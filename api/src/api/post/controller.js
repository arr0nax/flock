import Boom from 'boom';
import Post from '../../models/post';

const CONTROLLER = 'PostController';

class PostController {
  async create(request) {
    try {
      const post = await Post.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
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
      return Post.fetchAll();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new PostController();
