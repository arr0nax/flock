import Joi from 'joi';
import Constants from '../../../config/constants';
import Post from '../../models/post';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/posts',
    handler: Controller.fetchAll,
    config: {
      description: 'Get a list of posts',
      notes: 'Get session user info',
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
      //   policies: ['shouldSendUpdate'],
      // },
    },
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: Controller.fetchOne,
    config: {
      description: 'Get a post by id',
      notes: 'Uses fetchOne',
      tags: ['api'],
      id: 'get_post',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        params: {
          id: Joi.number().min(1),
        },
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        scope: false,
      },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'POST',
    path: '/posts',
    handler: Controller.create,
    config: {
      description: 'Create a new post',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: Post.validation,
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown()
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
    method: 'PATCH',
    path: '/posts/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a post',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: {
          text: Joi.string().required(),
        },
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
        params: {
          id: Joi.number().min(1),
        },
      },
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
    path: '/posts/{id}',
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
      plugins: {
        policies: ['isOwner'],
      },
    },
  }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
