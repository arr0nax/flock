import createReducer from '../../utils/createReducer';
import types from '../../modules/posts/types';
import states from '../../modules/posts/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  posts: createReducer(states.posts, {
    [types.ADD_POST](state, action) {
      let newState = cloneDeep(state)
      newState.data.unshift(action.payload)
      return newState;
    },
    [types.DELETE_POST_SUCCESS](state, action) {
      let newState = cloneDeep(state)
      const index = newState.data.findIndex(post => post.id === action.payload)
      newState.data.splice(index, 1)
      return newState;
    },
    [types.GET_POSTS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_POSTS_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
        data: action.payload.posts,
        pagination: action.payload.pagination,
      };
    },
    [types.GET_POSTS_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
    [types.GET_MORE_POSTS_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_MORE_POSTS_SUCCESS](state, action) {
      const posts = state.data.concat(action.payload.posts);
      return {
        ...state,
        requested: false,
        data: posts,
        pagination: action.payload.pagination,
      };
    },
    [types.GET_MORE_POSTS_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  post: createReducer(states.post, {
    [types.GET_POST_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.GET_POST_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
        data: action.payload,
      };
    },
    [types.GET_REPORTED_POST_SUCCESS](state, action) {
      return {
        ...state,
        requested: false,
        data: action.payload,
      };
    },
    [types.GET_POST_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
  new_post: createReducer(states.new_post, {
    [types.COMPOSE_POST](state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    [types.POST_POST_REQUEST](state, action) {
      return {
        ...state,
        requested: true,
      };
    },
    [types.POST_POST_SUCCESS](state, action) {
      return {
        ...states.new_post,
      };
    },
    [types.POST_POST_FAILURE](state, action) {
      return {
        ...state,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
