import Boom from 'boom';
import Notification from '../../models/notification';

const CONTROLLER = 'ReactController';

class NotificationController {
  async fetchNotifications(request) {
    try {
      return Notification.byUser(request.auth.credentials.user_id,);
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new NotificationController();
