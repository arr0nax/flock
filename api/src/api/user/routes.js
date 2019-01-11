import Joi from 'joi';
import Constants from '../../../config/constants';

const UserController = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/users',
    handler: UserController.fetchAll,
    config: {
      description: 'Get a list of users',
      notes: 'Get session user info',
      tags: ['api'],
      // validate: {
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
      // },
      // auth: {
      //   strategy: constants.AUTH_STRATEGIES.SESSION,
      //   scope: false,
      // },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.fetchOne,
    config: {
      description: 'Get a single user',
      notes: 'get a single user',
      tags: ['api'],
      // validate: {
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
      // },
      // auth: {
      //   strategy: constants.AUTH_STRATEGIES.SESSION,
      //   scope: false,
      // },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    handler: UserController.update,
    config: {
      description: 'Update a single user',
      notes: 'update a single user',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        payload: {
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
        },
        params: {
          id: Joi.number().min(1),
        },
      },
      auth: {
        strategies: [Constants.AUTH_STRATEGIES.SESSION],
        // scope: ['Admin'],
        scope: false,
      },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'PATCH',
    path: '/users/group',
    handler: UserController.updateGroup,
    config: {
      description: 'Update a single users group',
      notes: 'update a single user group',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        payload: {
          code: Joi.string().required(),
        },
      },
      auth: {
        strategies: [Constants.AUTH_STRATEGIES.SESSION],
        // scope: ['Admin'],
        scope: false,
      },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: UserController.create,
    config: {
      description: 'Create a new user',
      notes: 'Create a new user record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: {
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        },
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
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
  },
  {
    method: 'GET',
    path: '/users/{id}/all',
    handler: UserController.getPosts,
    config: {
      description: 'Get all posts by a user',
      notes: 'Get all posts by a user',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().min(1),
        },
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
