import Boom from 'boom';
import Notification from '../../models/notification';

const CONTROLLER = 'ReactController';

class NotificationController {
  async fetchNotifications(request) {
    try {
      const notifications = await Notification.byUser(request.auth.credentials.user_id);
      const notificationsSeen = await Notification.markSeenByUser(request.auth.credentials.user_id);
      return notifications;
    } catch (err) {
      return Boom.forbidden(err.message);
    }
  }

}

module.exports = new NotificationController();
