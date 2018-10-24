import Joi from 'joi';
import controller from './controller';

import Config from '../../../config/config.js';
import Constants from '../../../config/constants.js';


const Routes = {
  config: [

    {
      method: 'POST',
      path: '/attachments',
      handler: controller.uploadDocument,
      config: {
        description: 'Upload documents and their type',
        notes: 'Upload documents and their code; Required login session',
        tags: ['api'],
        validate: {
          payload: {
            file: Joi.object().required(),
            filename: Joi.string(),
            item_type: Joi.string().required(),
            item_id: Joi.string().required(),
          },
          headers: Joi.object({
            authorization: Joi.string().required(),
          }).unknown(),
        },
        payload: {
          maxBytes: Config.get('files.uploadSize'),
          output: 'file',
          parse: true,
          allow: 'multipart/form-data',
        },
        auth: {
          strategy: Constants.AUTH_STRATEGIES.SESSION,
          scope: false,
        },
      },
    },
  ],
};

module.exports = (server) => {
  server.route(Routes.config);
};
