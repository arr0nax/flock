import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/users/types';
import states from 'mobile/rdx/modules/users/states';

export default {
  users: createReducer(states.DEFAULT_USERS_STATE, {
    [types.ADD_USER](state, action) {
      const newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    },
  }),
};
