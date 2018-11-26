import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/users/types';
import states from 'rdx/modules/users/states';

export default {
  users: createReducer(states.DEFAULT_USERS_STATE, {
    [types.ADD_USER](state, action) {
      const newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    },
  }),
};
