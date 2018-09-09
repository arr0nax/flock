import Joi from 'joi';

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
      // validate: {
      //   payload: {
      //     uuid: Joi.string().required(),
      //     first_name: Joi.string().required(),
      //     last_name: Joi.string().required(),
      //     title: Joi.string().allow(null).empty(''),
      //     profile_image_url: Joi.string().allow(null).empty(''),
      //     email: Joi.string().required(),
      //     password: Joi.string().required(),
      //     scope: Joi.string().allow(null).empty(''),
      //   },
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
      // },
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
