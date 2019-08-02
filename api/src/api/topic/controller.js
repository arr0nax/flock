import Boom from 'boom';
import Topic from '../../models/topic';
import User from '../../models/user';
import Group from '../../models/group';

const CONTROLLER = 'TopicController';

class TopicController {
  async create(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await user.getGroup();
      console.log(user, group);
      if (user.attributes.id === group.attributes.topic_choser_id) {
        const topic = await Topic.create({
          text: request.payload.text,
          user_id: request.auth.credentials.user_id,
          group_id: user.attributes.group_id,
        });
        const newgroup = await Group.updateById(1, {
          topic_chosen: true,
          topic_id: topic.attributes.id,
          topic_choser_id: user.id
        });
        return {
          topic,
          group: newgroup
        };

      }
      return Boom.forbidden('You are not the topic chooser today')
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Topic.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Topic.updateById(request.params.id, {
        text: request.payload.text,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      const user = await User.findByID(request.auth.credentials.user_id);
      const group = await Group.findByID(user.attributes.group_id);
      let topics = await group.getTopics();
      return topics;

    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchOne(request)  {
    return Topic.findByID(request.params.id)
  }

}

module.exports = new TopicController();
