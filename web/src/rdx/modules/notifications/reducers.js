import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/notifications/types';
import states from 'rdx/modules/notifications/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  notifications: createReducer(states.DEFAULT_NOTIFICATION_STATE, {
    [types.SET_NOTIFICATIONS](state, action) {
      return {
        data: action.payload,
        requested: false,
        errors: state.errors,
      };
    },
  }),
};
