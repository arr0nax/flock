import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/notifications/types';
import states from 'rdx/modules/notifications/states';

export default {
  notifications: createReducer(states.DEFAULT_NOTIFICATION_STATE, {
    [types.SET_NOTIFICATIONS](state, action) {
      return action.payload;
    },
  }),
};
