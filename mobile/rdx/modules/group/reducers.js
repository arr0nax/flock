import createReducer from '../../utils/createReducer';
import types from '../../modules/group/types';
import states from '../../modules/group/states';

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
