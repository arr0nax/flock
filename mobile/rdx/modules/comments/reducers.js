import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/comments/types';
import states from 'mobile/rdx/modules/comments/states';

export default {
  comments: createReducer(states.DEFAULT_COMMENTS_STATE, {
    [types.SET_COMMENTS](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_COMMENT](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] ? newState[action.payload.parent_id].push(action.payload.data) : newState[action.payload.parent_id] = [action.payload.data];
      return newState;
    },
  }),
};
