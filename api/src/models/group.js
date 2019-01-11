import BaseModel from './base';
import User from './user';
import Post from './post';
import Joi from 'joi';

const TABLE_NAME = 'groups';
import bookshelf from './db';


class Group extends BaseModel {
  static validation = {
    name: Joi.string().required(),
  }

  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  users() {
    return this.hasMany('User');
  }

  posts() {
    return this.hasMany('Post')
  }

  getUsers() {
    return this.users().fetch({columns: ['first_name', 'last_name', 'image_url', 'id']})
  }

  fetchAllPosts() {
    return this.posts().fetch();
  }

  static findByCode(code) {
    return this.forge({code}).fetch();
  }
}

module.exports = bookshelf.model('Group', Group);
