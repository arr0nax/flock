import types from 'rdx/modules/notifications/types';
import createAction from 'rdx/utils/createAction';

export default {
  getNotifications: payload => createAction(types.GET_NOTIFICATIONS_REQUEST, payload),
  setNotifications: payload => createAction(types.SET_NOTIFICATIONS, payload),
};
