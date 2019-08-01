import Joi from 'joi';
import Constants from '../../../config/constants';
import Group from '../../models/group';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/groups',
    handler: Controller.fetchAll,
    config: {
      description: 'Get a list of groups',
      notes: 'Get a list of groups',
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
    path: '/groups/{id}/users',
    handler: Controller.fetchUsers,
    config: {
      description: 'Get a list users in a group',
      notes: 'Get a list users in a group',
      tags: ['api'],
      validate: {
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
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
    path: '/groups',
    handler: Controller.create,
    config: {
      description: 'Create a new group',
      notes: 'Create a new group record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: Group.validation,
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
        policies: ['isAdmin'],
      },
    },
  },
  {
    method: 'GET',
    path: '/groups/{id}',
    handler: Controller.fetchOne,
    config: {
      description: 'Get a  group',
      notes: 'Get a  group',
      tags: ['api'],
      validate: {
      //   headers: Joi.object({
      //     authorization: Joi.string().required(),
      //   }).unknown(),
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
    method: 'PATCH',
    path: '/groups/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a group',
      notes: 'Create a new group record; scope [Admin, SuperAdmin]',
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
        strategies: [Constants.AUTH_STRATEGIES.SESSION],
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
    path: '/groups/{id}',
    handler: Controller.destroy,
    config: {
      description: 'Destroy a group',
      notes: 'Create a new group record; scope [Admin, SuperAdmin]',
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
