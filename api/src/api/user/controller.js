import Boom from 'boom';
import Bcrypt from 'bcryptjs';
import User from '../../models/user';
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

  async getPosts(request) {
    try {
      return Post.byUser(request.auth.credentials.user_id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new UserController();
