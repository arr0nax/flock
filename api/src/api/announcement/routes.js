import Joi from 'joi';
import Constants from '../../../config/constants';
import Announcement from '../../models/announcement';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/announcements',
    handler: Controller.fetchAll,
    config: {
      description: 'Get a list of announcements',
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
    method: 'POST',
    path: '/announcements',
    handler: Controller.create,
    config: {
      description: 'Create a new post',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: Announcement.validation,
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown()
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        // scope: ['Admin'],
      },
      plugins: {
        policies: ['isAdmin'],
      },
    },
  },
  {
    method: 'POST',
    path: '/announcements/{id}/seen',
    handler: Controller.markSeenByUser,
    config: {
      description: 'mark an announcement as seen',
      notes: 'deletes announcement_seen record',
      tags: ['api'],
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
        // scope: ['Admin'],
      },
      // plugins: {
      //   policies: ['isAdmin'],
      // },
    },
  },
  {
    method: 'PATCH',
    path: '/announcements/{id}',
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
        policies: ['isAdmin'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/announcements/{id}',
    handler: Controller.destroy,
    config: {
      description: 'Destroy a post',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
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
        policies: ['isAdmin'],
      },
    },
  }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
