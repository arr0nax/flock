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
    [types.GET_NOTIFICATIONS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_NOTIFICATIONS_SUCCESS](state, action) {
      return {
        data: action.payload,
        errors: {...state.errors},
        requested: false,
      };
    },
    [types.GET_NOTIFICATIONS_FAILURE](state, action) {
      return {
        data: {...state.data},
        action: action.payload,
        requested: false,
      };
    },
  }),
};
