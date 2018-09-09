import uuidv4 from 'uuid/v4';
import Boom from 'boom';
import BaseModel from './base';
import User from './user';
// import Log from '../utils/log';
import to from '../utils/to';

const TABLE_NAME = 'sessions';
// const log = Log.getLogger('sessions');

class Session extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  // eslint-disable-next-line class-methods-use-this
  get tableName() {
    return TABLE_NAME;
  }

  // Relations
  user() {
    return this.belongsTo(User);
  }

  // constructor(...args) {
  //   super(...args);
  // }

  static findByKey(key) {
    return this.findOne({}, {
      key,
    });
  }

  static findByUserID(id) {
    return this.findOne({}, {
      user_id: id,
    });
  }

  static findByCredentials(sessionId, sessionKey) {
    return this.findOne({}, {
      id: sessionId,
      key: sessionKey,
    });
  }

  static async createOne(userId) {
    const [err, user] = await to(User.findByID(userId));
    if (err != null) return Boom.notFound(err);

    const [err2, sess] = await to(Session.create({
      key: uuidv4(),
      user_id: user.attributes.id,
    }));

    if (err2 != null) return Boom.badRequest('Session failed', 'user', null);

    return sess;
  }
}

export default Session;
