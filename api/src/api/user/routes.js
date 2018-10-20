import Joi from 'joi';
import constants from '../../../config/constants';

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
    method: 'POST',
    path: '/register',
    handler: UserController.create,
    config: {
      description: 'Create a new user',
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
  },
  {
    method: 'GET',
    path: '/users/{id}/all',
    handler: UserController.getPosts,
    config: {
      description: 'Create a new user',
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
