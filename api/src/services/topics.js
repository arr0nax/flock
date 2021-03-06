import Path from 'path';
import Boom from 'boom';

// import Log from '../utils/log';
import BindAll from '../utils/bind-all';
import Attachment from '../models/attachment';
import User from '../models/user';
import Group from '../models/group';

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

  async chooseTopic() {
    try {
      const groups = await Group.collection().fetch();
      groups.forEach(async group => {
        try {
          const topics = await group.getTopics();
          const users = await group.getUsersWhoLoggedInToday();
          // const users = await group.getUsers();
          // console.log('---------------------users-------------------');
          // console.log(users);
          // console.log('---------------------users-------------------');
      
          var topic = topics.models[Math.floor(Math.random()*topics.length)];
          var user = users.models[Math.floor(Math.random()*users.length)];
          // console.log(user);
          const newgroup = await Group.updateById(group.attributes.id, {
            topic_chosen: false,
            topic_choser_id: user && user.id
          });
          // console.log(newgroup);
          await User.where({logged_in_today: true}).save({logged_in_today: false}, {method: 'update', patch:true, require:false})
        } catch (err) {
          console.log(err);
          return Boom.forbidden(err.message);
        }
      })
      return 'success';
    } catch (err) {
      console.log(err);
      return Boom.forbidden(err.message);
    }
  }
}

module.exports = TopicService.create();
