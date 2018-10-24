import Joi from 'joi';
import Constants from '../../../config/constants';

const Controller = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/notifications',
    handler: Controller.fetchNotifications,
    config: {
      description: 'Get a list of notifications for a user',
      notes: 'Get session user notifications',
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
      //   policies: ['is-logged-in'],
      // },
    },
  },
  ]
}

module.exports = (server) => {
  server.route(Routes.config);
};
