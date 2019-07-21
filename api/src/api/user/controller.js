 import Boom from 'boom';
import Bcrypt from 'bcryptjs';
import User from '../../models/user';
import Group from '../../models/group';
import Post from '../../models/post';

const CONTROLLER = 'UserController';

class UserController {

  async create(request) {
    try {
      const salt = Bcrypt.genSaltSync();
      const hash = Bcrypt.hashSync(request.payload.password, salt);
      const user = await User.create({
        first_name: request.payload.first_name,
        last_name: request.payload.last_name,
        email: request.payload.email,
        password: hash,
        group_id: 1, // temporary until there are enough people 
      });
      return user;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      return User.fetchAll();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchOne(request) {
    try {
      return User.getInfo(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async getPosts(request) {
    try {
      const user = await User.findByID(request.params.id);
      const posts = await user.getPosts();
      const comments = await user.getComments();
      const replies = await user.getReplies();
      return { posts, comments, replies };
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return User.updateById(request.params.id, {
        first_name: request.payload.first_name,
        last_name: request.payload.last_name,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async updateGroup(request) {
    try {
      const group = await Group.findByCode(request.payload.code);
      console.log(group);
      return User.updateById(request.auth.credentials.user_id, {
        group_id: group.attributes.id,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new UserController();
