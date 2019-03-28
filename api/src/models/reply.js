import BaseModel from './base';
import Comment from './comment';
import User from './user';
import Joi from 'joi';

const TABLE_NAME = 'replies';
import bookshelf from './db';


class Reply extends BaseModel {
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

  comment() {
    return this.belongsTo(Comment);
  }

  getComments() {
    return this.comments().fetch();
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }


}

module.exports = bookshelf.model('Reply', Reply);
