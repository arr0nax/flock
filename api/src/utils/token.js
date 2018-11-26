import JWT from 'jsonwebtoken';
import Hoek from 'hoek';

import Config from '../../config/config';
import Constants from '../../config/constants';
// import Session from '../models/session';

const LOG_NAME = 'Token';

class Token {
  static ALGO = 'HS256';

  static JWT_TYPE = {
    SESSION: 'session',
    TOKEN: 'token',
    USER: 'user',
    CODE: 'code',
  }

  constructor() {
    this.tokenSecret = Config.get('token.secret');
    this.createSession = this.createSession.bind(this);
    // this.createUser = this.createUser.bind(this);
    // this.createToken = this.createToken.bind(this);
    this.createCode = this.createCode.bind(this);
    this.decodeCode = this.decodeCode.bind(this);
  }

  createSession(session) {
    // this.log.debug('session', session, scope);
    Hoek.assert(session.passwordHash !== undefined, 'passwordHash required');
    const token = JWT.sign({
      type: Token.JWT_TYPE.SESSION,
      user_id: session.user_id,
      sessionId: session.id,
      sessionKey: session.key,
      passwordHash: session.passwordHash,
    },
    this.tokenSecret, {
      algorithm: Token.ALGO,
      expiresIn: Constants.EXPIRATION_PERIOD.LONG,
    },
    );
    return token;
  }

  // createUser(user, scope, expirationPeriod) {
  //   this.log.debug('user', user);

  //   let u = user;
  //   delete u.password;

  //   const token = JWT.sign({
  //       type: Token.JWT_TYPE.USER,
  //       user: u,
  //       scope,
  //     },
  //     this.tokenSecret, {
  //       algorithm: Token.ALGO,
  //       expiresIn: expirationPeriod,
  //     },
  //   );
  //   return token;
  // }

  // createToken(user, session, scope, expirationPeriod) {
  //   this.log.debug(session);
  //   const token = JWT.sign({
  //       type: Token.JWT_TYPE.TOKEN,
  //       sessionId: session.id,
  //       sessionKey: session.key,
  //       passwordHash: session.passwordHash,
  //       scope,
  //     },
  //     this.tokenSecret, {
  //       algorithm: Token.ALGO,
  //       expiresIn: expirationPeriod,
  //     },
  //   );
  //   return token;
  // }

  createCode(email, reason) {
    this.log.debug(`${LOG_NAME}.createCode for ${reason} with ${email}`);
    const token = JWT.sign({
      type: Token.JWT_TYPE.CODE,
      email,
      reason,
    },
    this.tokenSecret, {
      algorithm: Token.ALGO,
    },
    );
    return token;
  }

  decodeCode(code) {
    const decoded = JWT.verify(code, this.tokenSecret);
    return decoded;
  }

  // used mostly for testing; NOTE: move to UserService
  async createTokenByUser(user) {
    this.log.debug(`${LOG_NAME}.createTokenByUser for ${user.id}`);
    // TODO: add user/session
    // const session = await Session.createOne(user.id);
    const session = { };
    const sess = session.attributes;
    sess.passwordHash = user.password;
    return this.createSession(sess);
  }
}


module.exports = new Token();
