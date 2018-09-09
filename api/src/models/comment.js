import BaseModel from './base';
const TABLE_NAME = 'comments';

class Comment extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  static byPost(id) {
    return this.query().where('post_id', id);
  }
}

module.exports = Comment;
