import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/notifications/types';
import states from 'mobile/rdx/modules/notifications/states';

export default {
  notifications: createReducer(states.DEFAULT_NOTIFICATION_STATE, {
    [types.SET_NOTIFICATIONS](state, action) {
      return action.payload;
    },
  }),
};
