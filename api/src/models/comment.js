import BaseModel from './base';
import Post from './post';
import User from './user';
import Reply from './reply';
import bookshelf from './db';
import Joi from 'joi';

const TABLE_NAME = 'comments';

class Comment extends BaseModel {
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

  post() {
    return this.belongsTo(Post);
  }

  getPost() {
    return this.post().fetch();
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }

  replies() {
    return this.hasMany(Reply);
  }

  getReplies() {
    return this.replies().query('where', 'reported', '=', 'false').fetch();
  }

  getRepliesAll() {
    return this.replies().fetch();
  }
}


module.exports = bookshelf.model('Comment', Comment);
