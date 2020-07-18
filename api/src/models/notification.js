import BaseModel from './base';
const TABLE_NAME = 'notifications';
import bookshelf from './db';
import Joi from 'joi';


class Notification extends BaseModel {
  static validation = {
    item_type: Joi.string().required(),
    item_id: Joi.number().required(),
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

  static byUser(id) {
    return this.query().where({user_id: id}).orderBy('id', 'DESC');
  }

  static byUser100(id) {
    return this.query().where({user_id: id}).orderBy('id', 'DESC').limit(100);
  }

  static markSeenByUser(id) {
    return this.forge({
      'user_id': id,
    }).fetchAll()
      .then(models => {
        models.map(model => model ? model.save({ new: false }, { patch: true }) : undefined)
      }
    );
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }

}

module.exports = bookshelf.model('Notification', Notification);
