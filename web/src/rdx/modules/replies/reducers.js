import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/replies/types';
import states from 'rdx/modules/replies/states';

export default {
  replies: createReducer(states.DEFAULT_REPLIES_STATE, {
    [types.SET_REPLIES](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] = action.payload.data;
      return newState;
    },
  }),
};
