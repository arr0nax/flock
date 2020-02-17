import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/attachments/types';
import states from 'rdx/modules/attachments/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  post_attachments: createReducer(states.DEFAULT_POST_ATTACHMENTS_STATE, {
    [types.SET_POST_ATTACHMENTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.INIT_SET_POST_ATTACHMENTS](state, action) {
        return {
            ...state,
            requested: false,
            data: {...action.payload}
        }
    },
    [types.ADD_POST_ATTACHMENT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.GET_ATTACHMENTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_ATTACHMENTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: false,
      };
    },
    [types.GET_ATTACHMENTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
    [types.POST_POST_ATTACHMENT_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  comment_attachments: createReducer(states.DEFAULT_COMMENT_ATTACHMENTS_STATE, {
    [types.SET_COMMENT_ATTACHMENTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.INIT_SET_COMMENT_ATTACHMENTS](state, action) {
        return {
            ...state,
            requested: false,
            data: {...action.payload}
        }
    },
    [types.ADD_COMMENT_ATTACHMENT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.GET_ATTACHMENTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_ATTACHMENTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: false,
      };
    },
    [types.GET_ATTACHMENTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  reply_attachments: createReducer(states.DEFAULT_REPLY_ATTACHMENTS_STATE, {
    [types.SET_REPLY_ATTACHMENTS](state, action) {
      var newState = cloneDeep(state);
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.INIT_SET_REPLY_ATTACHMENTS](state, action) {
        return {
            ...state,
            requested: false,
            data: {...action.payload}
        }
    },
    [types.ADD_REPLY_ATTACHMENT](state, action) {
      let newState = cloneDeep(state)
      newState.data[action.payload.item_id] = action.payload;
      return newState;
    },
    [types.GET_ATTACHMENTS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_ATTACHMENTS_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
      };
    },
    [types.GET_ATTACHMENTS_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
