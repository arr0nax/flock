import BaseModel from './base';

const TABLE_NAME = 'attachments';

class Attachment extends BaseModel {
  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  // static applications() {
  //   return this.belongsTo(Application);
  // }

  // eslint-disable-next-line class-methods-use-this
  get tableName() {
    return TABLE_NAME;
  }

  // eslint-disable-next-line class-methods-use-this
  get hasTimestamps() {
    return true;
  }

  // static getByApplicationID(appId) {
  //   return this.findAll({
  //     application_id: appId,
  //   });
  // }

  // static getByApplicationIDType(appId, type) {
  //   return this.findAll({
  //     application_id: appId,
  //     type,
  //   });
  // }
}

export default Attachment;
