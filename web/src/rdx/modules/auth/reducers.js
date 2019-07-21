import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/auth/types';
import states from 'rdx/modules/auth/states';
import cloneDeep from 'lodash/cloneDeep';

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
    [types.LOGOUT_SUCCESS](state, action) {
      return false;
    },
  }),
  user: createReducer(states.user, {
    [types.SET_USER](state, action) {
      return {
        data: action.payload,
        errors: state.errors,
        requested: false,
      };
    },
    [types.LOGIN_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        requested: true,
      };
    },
    [types.LOGIN_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        data: action.payload,
        errors: {},
        requested: false,
      };
    },
    [types.LOGIN_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        data: {...state.data},
        errors: action.payload,
        requested: false,
      };
    },
  }),
  register: createReducer(states.register, {
    [types.REGISTER_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.REGISTER_SUCCESS](state, action) {
      return {
        data: action.payload,
        errors: {text: 'registration success! please log in'},
        requested: false,
      };
    },
    [types.REGISTER_FAILURE](state, action) {
      return {
        data: {...state.data},
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
