import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/replies/types';
import states from 'mobile/rdx/modules/replies/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  replies: createReducer(states.DEFAULT_REPLIES_STATE, {
    [types.SET_REPLIES](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_REPLY](state, action) {
      var newState = cloneDeep(state);
      newState[action.payload.parent_id] ? newState[action.payload.parent_id].push(action.payload.data) :
      newState.data[action.payload.parent_id] = [action.payload.data];
      return newState;
    },
  }),
};
