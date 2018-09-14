import {
  POST_POST_REQUEST,
  POST_POST_SUCCESS,
  POST_POST_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../lib/constants/actions';
import { DEFAULT_POSTS_STATE } from '../lib/constants/states';

export function post(state = {}, action) {
  switch (action.type) {
    case POST_POST_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_POST_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        post: action.payload,
      });

    case POST_POST_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}

export function posts(state = DEFAULT_POSTS_STATE, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_POST_SUCCESS:
      const newPosts = [...state.posts];
      newPosts.push(action.payload);
      return Object.assign({}, {...state}, {
        requested: true,
        posts: newPosts,
      });

    case GET_POSTS_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        posts: action.payload,
      });

    case GET_POSTS_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
