import BaseModel from './base';
import User from './user';
import Group from './group';
import Joi from 'joi';

const TABLE_NAME = 'topics';
import bookshelf from './db';


class Topic extends BaseModel {
  static validation = {
    text: Joi.string().required(),
  }

  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User');
  }

  group() {
    return this.belongsTo('Group')
  }

  getUser() {
    return this.user().fetch();
  }

  getGroup() {
    return this.group().fetch();
  }

}

module.exports = bookshelf.model('Topic', Topic);
