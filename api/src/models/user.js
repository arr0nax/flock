import BaseModel from './base';
import Post from './post';
import Bcrypt from 'bcryptjs';
import Boom from 'boom';
const TABLE_NAME = 'users';

class User extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  static findByEmail(email) {
    return this.findOne({}, {
      email,
    });
  }

  static validateLogin(user, password) {
    return new Promise((resolve, reject) => {
      if (user && user.password && Bcrypt.compareSync(password, user.password)) {
        resolve({
          success: true,
          id: user.id,
        });
      } else {
        reject(Boom.unauthorized('Invalid username / password', 'email/password', null));
      }
    });
  }
}

module.exports = User;
