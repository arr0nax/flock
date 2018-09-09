import Boom from 'boom';
import Token from '../utils/token';
import Session from '../models/session';
import User from '../models/user';
import to from '../utils/to';
import Config from '../../config/config';
import Constants from '../../config/constants';

const NAME = 'AuthPlugin';

class AuthPlugin {
  constructor() {
    this.register = this.register.bind(this);
  }

  static applySessionStrategy(server) {
    server.ext('onPostHandler', (request, reply) => {
      const creds = request.auth.credentials;
      // console.log('creds', creds);

      if (creds && request.response.header) {
        // request.response.header(
        //   'X-Access-Token',
        //   Token.createUser(creds.user, creds.scope, Constants.EXPIRATION_PERIOD.SHORT),
        // );

        if (creds.type === 'session') {
          request.response.header(
            'X-Refresh-Token',
            Token.createSession({
              user_id: creds.user_id,
              id: creds.sessionId,
              key: creds.sessionKey,
              passwordHash: creds.passwordHash,
            }, creds.scope, Constants.EXPIRATION_PERIOD.MEDIUM),
          );
        }
      }

      return reply.continue;
    });

    server.auth.strategy(Constants.AUTH_STRATEGIES.SESSION, 'jwt', {
      key: Config.get('token.secret'),
      verifyOptions: {
        algorithms: ['HS256'],
      },

      validate: async (decoded) => {
        if (decoded.type === 'session') {
          const [err, sess] = await to(Session
            .findByCredentials(decoded.sessionId, decoded.sessionKey));
          if (err) return Boom.unauthorized();

          if (!sess || err != null) {
            return {
              isValid: false,
              credentials: null,
            };
          }

          const id = sess.attributes.user_id;
          const [err2, user] = await to(User.findByID(id));
          if (err2) return Boom.unauthorized();

          if (!user || err2 != null) {
            return {
              isValid: false,
              credentials: null,
            };
          }

          if (user.attributes.password !== decoded.passwordHash) {
            return {
              isValid: false,
              credentials: null,
            };
          }

          return {
            isValid: true,
            credentials: decoded,
          };
        }

        return {
          isValid: false,
          credentials: null,
        };
      },
    });
  }

  static customForbiddenMessage(server) {
    server.ext('onPreResponse', (request, h) => {
      if (Boom.isBoom(request.response)) {
        return h.continue;
      }

      const {
        response,
      } = request;

      if (
        response.output &&
        response.output.statusCode === 403 &&
        response.output.payload &&
        response.output.payload.message === 'Insufficient scope'
      ) {
        response.output.payload.message = 'Insufficient permissions';
      }

      return h.continue;
    });
  }

  register = (server) => {
    // Log.logActionStart(log, `Register ${NAME}`);
    // this.log.info(`Register ${NAME}`);

    AuthPlugin.customForbiddenMessage(server);

    AuthPlugin.applySessionStrategy(server);

    const getIP = request => (
      request.headers['x-real-ip'] ||
      request.headers['x-forwarded-for'] ||
      request.info.remoteAddress ||
      request.socket.remoteAddress ||
      request.socket.info.remoteAddress
    );

    server.method('getIP', getIP, {});
  }
}

module.exports = (() => {
  const plugin = new AuthPlugin();
  return {
    name: NAME,
    register: plugin.register,

    instance: plugin,
    AuthPlugin, // testing only
  };
})();
