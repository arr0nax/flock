import BaseModel from './base';
import Comment from './comment';
import User from './user';
import Joi from 'joi';

const TABLE_NAME = 'posts';
import bookshelf from './db';


class Post extends BaseModel {
  static validation = {
    text: Joi.string().required(),
  }

  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  user() {
    return this.belongsTo('User');
  }

  comments() {
    return this.hasMany(Comment);
  }

  getUser() {
    return this.user().fetch();
  }

  getComments() {
    return this.comments().fetch();
  }
}

module.exports = bookshelf.model('Post', Post);
