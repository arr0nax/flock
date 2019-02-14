import Boom from 'boom';
import Post from '../../models/post';
import User from '../../models/user';
import Group from '../../models/group';

const CONTROLLER = 'PostController';

class PostController {
  async create(request) {
    try {
      const forbidden = await Post.findForbidden(request.payload.text);
      console.log(forbidden);
      if (forbidden) return Boom.forbidden('Post contains restricted language');
      const user = await User.findByID(request.auth.credentials.user_id);
      const post = await Post.create({
        text: request.payload.text,
        user_id: request.auth.credentials.user_id,
        group_id: user.attributes.group_id,
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
      // const posts = await Post.fetchAll();
      // const newPosts = posts.map(async (post) => {
      //   const user = await post.getUser();
      //   console.log(user);
      //   return {
      //     post,
      //     user,
      //   }
      // });
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await Group.findByID(user.attributes.group_id);
      const count = await Group.size(1);
      console.log(count);
      return group.fetchAllPosts();

      return Promise.all(newPosts).then(completed => completed)
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new PostController();
