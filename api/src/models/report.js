import BaseModel from './base';
const TABLE_NAME = 'reports';
import bookshelf from './db';
import Joi from 'joi';
import ReportVote from './report_vote';
import Post from './post';
import Comment from './comment';
import Reply from './reply';


class Report extends BaseModel {
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

  static byGroup(id) {
    return this.query().where({group_id: id, resolved: false});
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
    return this.votes().fetch();
  }

  getTrueVotes() {
    return this.votes().query('where', 'vote', '=', 'true').count('id');
  }

  getFalseVotes() {
    return this.votes().query('where', 'vote', '=', 'false').count('id');
  }

}

module.exports = bookshelf.model('Report', Report);
