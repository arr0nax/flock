import Joi from 'joi';
import Constants from '../../../config/constants';
import Reply from '../../models/reply';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/comments/{id}/replies',
    handler: Controller.fetchAll,
    config: {
      description: 'Get a list of replies on a comment',
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
    path: '/comments/{id}/replies',
    handler: Controller.create,
    config: {
      description: 'Create a new reply on a comment',
      notes: 'Create a new reply record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: Reply.validation,
        params: {
          id: Joi.number().min(1),
        },
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
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
    path: '/replies/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a reply',
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
    path: '/replies/{id}',
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
