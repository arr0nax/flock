import Joi from 'joi';
import Constants from '../../../config/constants';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/posts/{id}/reacts',
    handler: Controller.fetchPostReacts,
    config: {
      description: 'Get a list of reacts on a post',
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
    path: '/comments/{id}/reacts',
    handler: Controller.fetchCommentReacts,
    config: {
      description: 'Get a list of reacts on a comment',
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
    path: '/replies/{id}/reacts',
    handler: Controller.fetchReplyReacts,
    config: {
      description: 'Get a list of reacts on a reply',
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
    method: 'POST',
    path: '/reacts',
    handler: Controller.create,
    config: {
      description: 'Create a new react',
      notes: 'Create a new react record; scope [Admin, SuperAdmin]',
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
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        // scope: ['Admin'],
        scope: false,
      },
      // plugins: {
      //   policies: ['is-admin'],
      // },
    },
  },
  {
    method: 'PATCH',
    path: '/reacts/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a react',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
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
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        // scope: ['Admin'],
        scope: false,
      },
      // plugins: {
      //   policies: ['is-admin'],
      // },
    },
  },
  {
      method: 'DELETE',
      path: '/reacts/{id}',
      handler: Controller.destroy,
      config: {
        description: 'Destroy a post',
        notes: 'Create a new post record; scope [Admin, SuperAdmin]',
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
        auth: {
          strategy: Constants.AUTH_STRATEGIES.SESSION,
          // scope: ['Admin'],
          scope: false,
        },
        // plugins: {
        //   policies: ['is-admin'],
        // },
      },
    }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
