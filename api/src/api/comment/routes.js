import Joi from 'joi';
import Constants from '../../../config/constants';
import Comment from '../../models/comment';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/posts/{id}/comments',
    handler: Controller.fetchAll,
    config: {
      description: 'Get a list of comments on a post',
      notes: 'Get session user info',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().min(1),
        },
      },
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
    path: '/posts/{id}/comments/all',
    handler: Controller.fetchAllReported,
    config: {
      description: 'Get a list of comments on a post, included reported',
      notes: 'Get session user info',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().min(1),
        },
      },
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
    path: '/posts/{id}/comments',
    handler: Controller.create,
    config: {
      description: 'Create a new comment on a post',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().min(1),
        },
        payload: Comment.validation,
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        // scope: ['Admin'],
        scope: false,
      },
      plugins: {
        policies: ['shouldSendUpdate'],
      },
    },
  },
  {
    method: 'GET',
    path: '/comments/{id}',
    handler: Controller.fetchOne,
    config: {
      description: 'Get a comment',
      notes: 'Gets a comment based on id',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().min(1),
        },
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        scope: false,
      },
    },
  },
  {
    method: 'PATCH',
    path: '/comments/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a comment',
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
      plugins: {
        policies: ['isOwner'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/comments/{id}',
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
        // params: {
        //   id: Joi.number().min(1),
        // },
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
