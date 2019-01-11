import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/reacts/types';
import states from 'rdx/modules/reacts/states';

export default {
  post_reacts: createReducer(states.DEFAULT_POST_REACTS_STATE, {
    [types.SET_POST_REACTS](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_POST_REACT](state, action) {
      let newState = {...state}
      newState[action.payload.item_id] ? newState[action.payload.item_id].unshift(action.payload) : newState[action.payload.item_id] = [action.payload];
      return newState;
    },
  }),
  comment_reacts: createReducer(states.DEFAULT_COMMENT_REACTS_STATE, {
    [types.SET_COMMENT_REACTS](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_COMMENT_REACT](state, action) {
      let newState = {...state}
      newState[action.payload.item_id] ? newState[action.payload.item_id].unshift(action.payload) : newState[action.payload.item_id] = [action.payload];
      return newState;
    },
  }),
  reply_reacts: createReducer(states.DEFAULT_REPLY_REACTS_STATE, {
    [types.SET_REPLY_REACTS](state, action) {
      var newState = {...state};
      newState[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.ADD_REPLY_REACT](state, action) {
      let newState = {...state}
      newState[action.payload.item_id] ? newState[action.payload.item_id].unshift(action.payload) : newState[action.payload.item_id] = [action.payload];
      return newState;
    },
  }),
};
