import Joi from 'joi';
import Constants from '../../../config/constants';

const InitController = require('./controller');

const Routes = {
  config: [{
    method: 'GET',
    path: '/init',
    handler: InitController.init,
    config: {
      description: 'Get all data needed for first page view',
      notes: 'Get users, posts, replies, comments, reacts',
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
    },
  }]
}

module.exports = (server) => {
  server.route(Routes.config);
};
