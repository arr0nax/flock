import createReducer from '../../utils/createReducer';
import types from '../users/types';
import states from '../users/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  users: createReducer(states.DEFAULT_USERS_STATE, {
    [types.ADD_USER](state, action) {
      const newState = cloneDeep(state);
      newState.data[action.payload.id] = action.payload;
      return newState;
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
