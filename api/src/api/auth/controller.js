import Boom from 'boom';
import Bcrypt from 'bcryptjs';
import User from '../../models/user';
import Token from '../../utils/token';
import Session from '../../models/session';
import Constants from '../../../config/constants';


const CONTROLLER = 'UserController';

class UserController {

  async login(request) {

    try {
      // TODO UserService
      const userModel = await User.findByEmail(request.payload.email);
      const user = userModel.attributes;
      const result = await User.validateLogin(user, request.payload.password);
      const session = await Session.createOne(result.id);
      //
      // let scopes = [];
      //
      // if (user.scope !== null && user.scope !== '') {
      //   const permissions = await RoleService.getScopesByRoleName(user.scope);
      //   scopes = [user.scope].concat(permissions);
      // }
      //
      const sess = session.attributes;
      sess.passwordHash = user.password;
      //
      delete user.password;

      return {
        user,
        token: Token.createSession(sess),
        // scope: scopes,
      };
    } catch (err) {
      console.log(err);
      return Boom.forbidden(err.message);
    }
  }

  logout(request) {
    console.log('logout');
    const creds = request.auth.credentials;
    return Session.destroyById(creds.sessionId);
  }

  hello(request) {
    return '<a href="https://www.flock.zone">almost there :)</a>'
  }

}

module.exports = new UserController();
