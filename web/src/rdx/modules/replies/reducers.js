import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/replies/types';
import states from 'rdx/modules/replies/states';
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
