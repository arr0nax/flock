import BaseModel from './base';
import Comment from './comment';
import User from './user';
import Group from './group';
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

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User');
  }

  group() {
    return this.belongsTo('Group')
  }

  comments() {
    return this.hasMany(Comment);
  }

  getUser() {
    return this.user().fetch();
  }

  getComments() {
    return this.comments().query('where', 'reported', '=', 'false').fetch();
  }

  getCommentsAll() {
    return this.comments().fetch();
  }

  static async findForbidden(text) {
    // const words = text.split(' ');
    // const array = await Promise.all(words.map(word => Group.findByCode(word))).then(values => {
    //   return values;
    // })
    // for(let i=0; i<array.length; i++) {
    //   if (array[i] !== null) return true;
    // }
    return false;

  }
}

module.exports = bookshelf.model('Post', Post);
