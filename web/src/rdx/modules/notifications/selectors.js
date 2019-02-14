import get from 'lodash/get';

export default {
  getNotifications: state => get(state, 'notifications.data'),
};
