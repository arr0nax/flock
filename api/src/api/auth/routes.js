import Joi from 'joi';
import User from '../../models/user';
import Constants from '../../../config/constants.js';

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
      },
    },
  },   {
    method: 'GET',
    path: '/logout',
    handler: AuthController.logout,
    config: {
      description: 'Logout and remove session',
      notes: 'Remove the session',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        scope: false,
      },
      // plugins: {
      //   policies: [AuditLog.create({})],
      // },
    },
  }, {
    method: 'GET',
    path: '/',
    handler: AuthController.hello,
    config: {
      description: 'Say hello',
      notes: ':)',
      tags: ['api']
    },
  }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
