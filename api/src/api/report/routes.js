import Joi from 'joi';
import Constants from '../../../config/constants';
import Report from '../../models/report';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/reports',
    handler: Controller.fetchReports,
    config: {
      description: 'Get a list of reports by group',
      notes: 'Get session user info',
      tags: ['api'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
      auth: {
        strategy: Constants.AUTH_STRATEGIES.SESSION,
        // scope: false,
      },
      // plugins: {
      //   policies: ['is-logged-in'],
      // },
    },
  },
  {
    method: 'POST',
    path: '/reports',
    handler: Controller.create,
    config: {
      description: 'Create a new report',
      notes: 'Create a new report record; scope [Admin, SuperAdmin]',
      tags: ['api'],
      validate: {
        payload: Report.validation,
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
    path: '/reports/{id}',
    handler: Controller.update,
    config: {
      description: 'Update a report',
      notes: 'Create a new post record; scope [Admin, SuperAdmin]',
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
      path: '/reports/{id}',
      handler: Controller.destroy,
      config: {
        description: 'Destroy a post',
        notes: 'Create a new post record; scope [Admin, SuperAdmin]',
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
