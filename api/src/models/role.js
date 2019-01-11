import BaseModel from './base';
import User from './user';

const TABLE_NAME = 'roles';
import bookshelf from './db';


class Role extends BaseModel {

  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  users() {
    return this.hasMany(User);
  }

  getUsers() {
    return this.users().fetch();
  }

}

module.exports = bookshelf.model('Role', Role);
