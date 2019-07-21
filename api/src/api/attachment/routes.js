import Joi from 'joi';
import Controller from './controller';

import Config from '../../../config/config.js';
import Constants from '../../../config/constants.js';


const Routes = {
  config: [

    {
      method: 'POST',
      path: '/attachments',
      handler: Controller.uploadDocument,
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
    {
      method: 'GET',
      path: '/posts/{id}/attachments',
      handler: Controller.fetchPostAttachments,
      config: {
        description: 'Get a list of attachments on a post',
        notes: 'Get session user info',
        tags: ['api'],
        validate: {
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
      method: 'GET',
      path: '/comments/{id}/attachments',
      handler: Controller.fetchCommentAttachments,
      config: {
        description: 'Get a list of attachments on a comment',
        notes: 'Get session user info',
        tags: ['api'],
        validate: {
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
      method: 'GET',
      path: '/replies/{id}/attachments',
      handler: Controller.fetchReplyAttachments,
      config: {
        description: 'Get a list of attachments on a reply',
        notes: 'Get session user info',
        tags: ['api'],
        validate: {
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
  ],
};

module.exports = (server) => {
  server.route(Routes.config);
};
