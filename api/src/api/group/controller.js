import Boom from 'boom';
import Group from '../../models/group';
var randomWords = require('random-words');

const CONTROLLER = 'GroupController';

class GroupController {
  async create(request) {
    try {
      const group = await Group.create({
        name: request.payload.name,
        code: randomWords({exactly:3, formatter: (word)=> word.slice(0,1).toUpperCase().concat(word.slice(1))}).join(''),
      });
      return group;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async destroy(request) {
    try {
      return Group.destroyById(request.params.id);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async update(request) {
    try {
      return Group.updateById(request.params.id, {
        name: request.payload.name,
      });
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchAll(request) {
    try {
      return Group.fetchAll();
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

  async fetchUsers(request) {
    try {
      const group = await Group.findByID(request.params.id);
      return group.getUsers();

      // return Promise.all(newGroups).then(completed => completed)
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new GroupController();
