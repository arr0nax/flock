import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/users/types';
import states from 'rdx/modules/users/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  users: createReducer(states.DEFAULT_USERS_STATE, {
    [types.ADD_USER](state, action) {
      const newState = cloneDeep(state);
      newState.data[action.payload.id] = action.payload;
      return newState;
    },
  }),
};
