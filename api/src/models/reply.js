import BaseModel from './base';
const TABLE_NAME = 'replies';

class Reply extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  static byComment(id) {
    return this.query().where('comment_id', id);
  }
}

module.exports = Reply;
