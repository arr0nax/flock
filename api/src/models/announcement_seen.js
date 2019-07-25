import BaseModel from './base';
import User from './user';
import Announcement from './announcement';
import Joi from 'joi';

const TABLE_NAME = 'announcement_seen';
import bookshelf from './db';


class AnnouncementSeen extends BaseModel {
  static validation = {

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

  user() {
    return this.belongsTo('User');
  }

  announcement() {
    return this.belongsTo('Announcement')
  }

  getUser() {
    return this.user().fetch();
  }

  getAnnouncement() {
    return this.announcement().fetch();
  }

  static byUserIdAnnouncementId(user_id, announcement_id) {
    return this.query().where({user_id, announcement_id});
  }

}

module.exports = bookshelf.model('AnnouncementSeen', AnnouncementSeen);
