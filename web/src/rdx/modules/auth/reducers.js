import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/auth/types';
import states from 'rdx/modules/auth/states';

export default {
  authToken: createReducer(states.authToken, {
    [types.SET_AUTH_TOKEN](state, action) {
      return action.payload;
    },
  }),
  logged_in: createReducer(states.logged_in, {
    [types.SET_AUTH_TOKEN](state, action) {
      return !!action.payload;
    },
  }),
  user: createReducer(states.user, {
    [types.SET_USER](state, action) {
      return action.payload;
    },
  }),
};
