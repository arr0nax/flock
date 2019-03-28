import BaseModel from './base';
const TABLE_NAME = 'reports';
import bookshelf from './db';
import Joi from 'joi';
import ReportVote from './report_vote';


class Report extends BaseModel {
  static validation = {
    group_id: Joi.number().required(),
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

  static byGroup(id) {
    return this.query().where({group_id: id});
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }

  votes() {
    return this.hasMany(ReportVote);
  }

  getVotes() {
    return this.votes().fetch()
  }

}

module.exports = bookshelf.model('Report', Report);
