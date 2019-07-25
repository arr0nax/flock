import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/announcements/types';
import states from 'rdx/modules/announcements/states';

export default {
  announcements: createReducer(states.DEFAULT_ANNOUNCEMENTS_STATE, {
    [types.GET_ANNOUNCEMENTS_SUCCESS](state, action) {
      return {
        requested: false,
        errors: {},
        data: action.payload
      };
    },
  }),
};
