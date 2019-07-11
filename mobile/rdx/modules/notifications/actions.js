import types from '../notifications/types';
import createAction from '../../utils/createAction';

export default {
  getNotifications: payload => createAction(types.GET_NOTIFICATIONS_REQUEST, payload),
  getNotificationsSuccess: payload => createAction(types.GET_NOTIFICATIONS_SUCCESS, payload),
  getNotificationsFailure: payload => createAction(types.GET_NOTIFICATIONS_FAILURE, payload),
  setNotifications: payload => createAction(types.SET_NOTIFICATIONS, payload),
};
