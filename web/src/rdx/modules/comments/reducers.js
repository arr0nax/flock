import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/comments/types';
import states from 'rdx/modules/comments/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  comments: createReducer(states.DEFAULT_COMMENTS_STATE, {
    [types.GET_COMMENTS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_COMMENTS_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_COMMENTS_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
    [types.SET_COMMENTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_COMMENT](state, action) {
      console.log(action);
      var newState = cloneDeep(state);
      newState.data[action.payload.post_id] ? newState.data[action.payload.post_id].push(action.payload) : newState.data[action.payload.post_id] = [action.payload];
      return newState;
    },
  }),
};
