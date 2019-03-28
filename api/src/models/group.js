import BaseModel from './base';
import User from './user';
import Post from './post';
import Report from './report';
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

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.hasMany('User');
  }

  posts() {
    return this.hasMany('Post')
  }

  reports() {
    return this.hasMany('Report')
  }

  static size(group_id) {
    let qb = BaseModel.query();
    return qb.select().from('users').where({group_id}).count('id');
  }

  getUsers() {
    return this.users().fetch({columns: ['first_name', 'last_name', 'image_url', 'id']})
  }

  async fetchAllPosts(pagination = {}) {
    // const posts = await this.posts().fetchPage(pagination);
    // console.log(posts);
    return this.posts().orderBy('-updated_at').fetchPage(pagination);
  }

  static findByCode(code) {
    return this.forge({code}).fetch();
  }
}

module.exports = bookshelf.model('Group', Group);
