import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/reacts/types';
import states from 'mobile/rdx/modules/reacts/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  post_reacts: createReducer(states.DEFAULT_POST_REACTS_STATE, {
    [types.SET_POST_REACTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_POST_REACT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] ? newState.data[action.payload.item_id].unshift(action.payload) : newState.data[action.payload.item_id] = [action.payload];
      return newState;
    },
    [types.GET_REACTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_REACTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_REACTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  comment_reacts: createReducer(states.DEFAULT_COMMENT_REACTS_STATE, {
    [types.SET_COMMENT_REACTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_COMMENT_REACT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] ? newState.data[action.payload.item_id].unshift(action.payload) : newState.data[action.payload.item_id] = [action.payload];
      return newState;
    },
    [types.GET_REACTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_REACTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_REACTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  reply_reacts: createReducer(states.DEFAULT_REPLY_REACTS_STATE, {
    [types.SET_REPLY_REACTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_REPLY_REACT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] ? newState.data[action.payload.item_id].unshift(action.payload) : newState.data[action.payload.item_id] = [action.payload];
      return newState;
    },
    [types.GET_REACTS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_REACTS_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_REACTS_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
