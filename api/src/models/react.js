import BaseModel from './base';
const TABLE_NAME = 'reacts';
import bookshelf from './db';
import Joi from 'joi';


class React extends BaseModel {
  static validation = {
    react: Joi.string().required(),
    item_type: Joi.string().required(),
    item_id: Joi.number().required(),
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

  static byPost(id) {
    return this.query().where({item_type: 'post', item_id: id});
  }

  static byComment(id) {
    return this.query().where({item_type: 'comment', item_id: id});
  }

  static byReply(id) {
    return this.query().where({item_type: 'reply', item_id: id});
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }

}

module.exports = bookshelf.model('React', React);
