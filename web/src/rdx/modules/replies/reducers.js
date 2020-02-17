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
    [types.INIT_SET_REPLIES](state, action) {
        return {
            ...state,
            data: {
                ...action.payload
            },
            requested: false
        }
    },
    [types.ADD_REPLY](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.comment_id] ? newState.data[action.payload.comment_id].push(action.payload) :
      newState.data[action.payload.comment_id] = [action.payload];
      return newState;
    },
    [types.DELETE_REPLY_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      const reply_index = newState.data[action.payload.parent_id].findIndex(reply => reply.id === action.payload.item_id);
      newState.data[action.payload.parent_id].splice(reply_index, 1);
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
