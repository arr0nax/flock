import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/comments/types';
import states from 'rdx/modules/comments/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  comments: createReducer(states.DEFAULT_COMMENTS_STATE, {
    [types.SET_COMMENTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_COMMENT](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] ? newState.data[action.payload.parent_id].push(action.payload.data) : newState.data[action.payload.parent_id] = [action.payload.data];
      return newState;
    },
  }),
};
