import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/types';
import states from 'rdx/modules/reacts/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  post_reacts: createReducer(states.DEFAULT_POST_REACTS_STATE, {
    [types.SET_POST_REACTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.parent_id] = action.payload.data;
      return newState;
    },
    [types.INIT_SET_POST_REACTS](state, action) {
        return {
          ...state,
          data: action.payload,
          requested: false,
        };
    },
    [types.GET_MORE_POSTS_SUCCESS] (state, action) {
      return {
        ...state,
        data: {
            ...state.data,
            ...action.payload.post_reacts
        },
        requested: false
    }
  },
    [types.ADD_POST_REACT](state, action) {
      let newState = cloneDeep(state)
      if (newState.data[action.payload.item_id]) {
        const index = newState.data[action.payload.item_id].findIndex(react => react.id === action.payload.id);
        if (index === -1) {
          newState.data[action.payload.item_id].unshift(action.payload);
        } else {
          newState.data[action.payload.item_id][index] = action.payload;
        }
      } else {
        newState.data[action.payload.item_id] = [action.payload];
      }
      return newState;
    },
    [types.GET_REACTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_REACTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: false,
      };
    },
    [types.GET_REACTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
    [types.POST_POST_REACT_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
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
    [types.INIT_SET_COMMENT_REACTS](state, action) {
        return {
          ...state,
          data: action.payload,
          requested: false,
        };
    },
    [types.GET_MORE_POSTS_SUCCESS] (state, action) {
      return {
        ...state,
        data: {
            ...state.data,
            ...action.payload.comment_reacts
        },
        requested: false
    }
  },
    [types.ADD_COMMENT_REACT](state, action) {
      let newState = cloneDeep(state)
      if (newState.data[action.payload.item_id]) {
        const index = newState.data[action.payload.item_id].findIndex(react => react.id === action.payload.id);
        if (index === -1) {
          newState.data[action.payload.item_id].unshift(action.payload);
        } else {
          newState.data[action.payload.item_id][index] = action.payload;
        }
      } else {
        newState.data[action.payload.item_id] = [action.payload];
      }
      return newState;
    },
    [types.GET_REACTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_REACTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: false,
      };
    },
    [types.GET_REACTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
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
    [types.INIT_SET_REPLY_REACTS](state, action) {
        return {
          ...state,
          data: action.payload,
          requested: false,
        };
    },
    [types.GET_MORE_POSTS_SUCCESS] (state, action) {
      return {
        ...state,
        data: {
            ...state.data,
            ...action.payload.reply_reacts
        },
        requested: false
    }
  },
    [types.ADD_REPLY_REACT](state, action) {
      let newState = cloneDeep(state)
      if (newState.data[action.payload.item_id]) {
        const index = newState.data[action.payload.item_id].findIndex(react => react.id === action.payload.id);
        if (index === -1) {
          newState.data[action.payload.item_id].unshift(action.payload);
        } else {
          newState.data[action.payload.item_id][index] = action.payload;
        }
      } else {
        newState.data[action.payload.item_id] = [action.payload];
      }
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
