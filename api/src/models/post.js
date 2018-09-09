import BaseModel from './base';
import Comment from './comment';
const TABLE_NAME = 'posts';

class Post extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  comments() {
    return this.hasMany(Comment);
  }

  static byUser(id) {
    return this.query().where('user_id', id);
  }
}

module.exports = Post;
