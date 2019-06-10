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
      newState.data[action.payload.comment_id] ? newState.data[action.payload.comment_id].push(action.payload) :
      newState.data[action.payload.comment_id] = [action.payload];
      return newState;
    },
    [types.GET_REPLIES_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_REPLIES_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_REPLIES_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
