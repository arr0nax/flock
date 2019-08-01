import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/group/types';
import states from 'rdx/modules/group/states';

export default {
  group: createReducer(states.DEFAULT_GROUP_STATE, {
    [types.GET_USER_GROUP_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
  }),
};
