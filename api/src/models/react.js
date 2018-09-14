import BaseModel from './base';
const TABLE_NAME = 'reacts';

class React extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  static byPost(id) {
    return this.query().where({type: 'post', item_id: id});
  }

  static byComment(id) {
    return this.query().where({type: 'comment', item_id: id});
  }

  static byReply(id) {
    return this.query().where({type: 'reply', item_id: id});
  }
}

module.exports = React;
