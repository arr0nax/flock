const Confidence = require('confidence');
const Boom = require('boom');

const Config = require('./config');

const criteria = {
  env: Config.get('env'), // process.env.NODE_ENV,
};

const manifest = {
  $meta: 'This file defines the server.',
  server: {
    // cache: 'redis',
    port: Config.get('port'),
    debug: {
      request: ['error'],
    },
    routes: {
      security: true,
      cors: true,
      validate: {
        failAction: async (request, h, err) => {
            console.error(err);
            throw err;
        },
      },
    },
  },
  register: {
    plugins: [
    {
      plugin: 'hapi-auth-jwt2',
    }, {
    //   plugin: 'vision',
    // }, {
    //   plugin: './plugins/emailer',
    // }, {
    //   plugin: './plugins/queue',
    // }, {
      plugin: './plugins/auth',
    }, {
      plugin: './plugins/api',
    }],
  },
};

const store = new Confidence.Store(manifest);

exports.get = key => store.get(key, criteria);

exports.meta = key => store.meta(key, criteria);
