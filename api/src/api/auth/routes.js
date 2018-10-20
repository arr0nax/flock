import Joi from 'joi';
import User from '../../models/user';

const AuthController = require('./controller');

const Routes = {
  config: [{
    method: 'POST',
    path: '/login',
    handler: AuthController.login,
    config: {
      description: 'log in as user',
      notes: 'Create a new user record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: User.validation.login,
        // headers: Joi.object({
        //   authorization: Joi.string().required(),
        // }).unknown(),
      },
      // auth: {
      //   strategy: constants.AUTH_STRATEGIES.SESSION,
      //   // scope: ['Admin'],
      //   scope: false,
      // },
      // plugins: {
      //   policies: ['is-admin'],
      // },
    },
  }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
