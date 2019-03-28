import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/posts/types';
import states from 'rdx/modules/posts/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  posts: createReducer(states.posts, {
    [types.ADD_POST](state, action) {
      let newState = cloneDeep(state)
      newState.data.unshift(action.payload)
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
      console.log(posts);
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
        ...states.post,
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
