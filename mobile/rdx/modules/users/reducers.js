import createReducer from '../../utils/createReducer';
import types from '../../modules/users/types';
import states from '../../modules/users/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  users: createReducer(states.DEFAULT_USERS_STATE, {
    [types.ADD_USER](state, action) {
      const newState = cloneDeep(state);
      newState.data[action.payload.id] = action.payload;
      return newState;
    },
    [types.GET_GROUP_USERS_SUCCESS](state, action) {
      const userObj = {};
      action.payload.forEach(user => userObj[user.id] = user);
      return {
        ...state,
        data: userObj,
        requested: false,
      };
    },
    [types.GET_USER_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_USER_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_USER_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
