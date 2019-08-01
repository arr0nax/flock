import Path from 'path';
import Boom from 'boom';

// import Log from '../utils/log';
import BindAll from '../utils/bind-all';
import Attachment from '../models/attachment';
import User from '../models/user';
import Group from '../models/group';
// import S3API from '../integrations/s3';
import Config from '../../config/config';
const fs = require('fs');
var Jimp = require('jimp');

const S3_REGION = 'us-west-2';



const LOG_NAME = 'TopicService';

class TopicService {
  static instance = null;

  static create() {
    this.instance = this.instance == null ? new TopicService() : this.instance;
    return this.instance;
  }

  constructor() {
    console.log(LOG_NAME);
    BindAll(this);
  }

  // static getUploadKey(type, filePath) {
  //   const key = `${type}/${Date.now()}_${Path.basename(filePath)}`;
  //   return key;
  // }

  async chooseTopic() {
    const group = await Group.findByID(1);
    const topics = await group.getTopics();
    const users = await group.getUsers();
    var topic = topics.models[Math.floor(Math.random()*topics.length)];
    var user = users.models[Math.floor(Math.random()*users.length)];

    const newgroup = await Group.updateById(1, {
      topic_chosen: false,
      topic_id: topic.id,
      topic_choser_id: user.id
    });
    console.log(newgroup);

  }
}

module.exports = TopicService.create();
