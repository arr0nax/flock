import BaseModel from './base';
const TABLE_NAME = 'report_votes';
import bookshelf from './db';
import Joi from 'joi';


class ReportVote extends BaseModel {
  static validation = {
    vote: Joi.boolean().required(),
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

  static byReport(id) {
    return this.query().where({report_id: id});
  }

  user() {
    return this.belongsTo(User);
  }

  getUser() {
    return this.user().fetch();
  }

  report() {
    return this.belongsTo(Report);
  }

  getReport() {
    return this.report().fetch();
  }

}

module.exports = bookshelf.model('ReportVote', ReportVote);
