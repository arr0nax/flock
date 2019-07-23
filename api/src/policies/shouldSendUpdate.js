import User from '../models/user';
import Role from '../models/role';
import Boom from 'boom';

const shouldSendUpdate = async function(request, h) {
  try {
    // return h.continue;
    // console.log(h);
    // console.log('item', request.response.source);
    switch(request.route.path) {
      case '/posts':
        request.server.plugins.hapio.io.emit('new_post', request.response.source);
        console.log('sent post');
        return h.continue;
      case '/posts/{id}/comments':
        request.server.plugins.hapio.io.emit('new_comment', request.response.source);
        console.log('sent comment');
        return h.continue;

      case '/comments/{id}/replies':
        request.server.plugins.hapio.io.emit('new_reply', request.response.source);
        console.log('sent reply');
        return h.continue;

      case '/reacts':
        request.server.plugins.hapio.io.emit('new_react', request.response.source);
        console.log('sent react');
        return h.continue;
      case '/attachments':
        console.log(request.response.source);
        request.server.plugins.hapio.io.emit('new_attachment', request.response.source);
        console.log('sent attachment');
        return h.continue;
      default:
        return h.continue;
    }
  } catch (err) {
    return Boom.forbidden(err.message);
  }
};

shouldSendUpdate.applyPoint = 'onPostHandler';

module.exports = shouldSendUpdate;
