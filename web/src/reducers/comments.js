import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_POST_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_POSTS_SUCCESS,
} from '../lib/constants/actions';
import { DEFAULT_COMMENTS_STATE } from '../lib/constants/states';

export function comment(state = {}, action) {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_COMMENT_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        comment: action.payload,
      });

    case POST_COMMENT_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}

export function comments(state = DEFAULT_COMMENTS_STATE, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      const newComments1 = {...state.comments};
      action.payload.map(post => newComments1[post.id] = []);
      return Object.assign({}, {...state}, {
        requested: true,
        comments: newComments1,
      });

    case POST_POST_SUCCESS:
      const newComments4 = {...state.comments};
      newComments4[action.payload.id] = [];
      return Object.assign({}, {...state}, {
        requested: true,
        comments: newComments4,
      });

    case POST_COMMENT_SUCCESS:
      const newComments3 = {...state.comments};
      newComments3[action.payload.post_id].push(action.payload);
      return Object.assign({}, {...state}, {
        requested: true,
        comments: newComments3,
      });

    case GET_COMMENTS_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_COMMENTS_SUCCESS:
      const newComments2 = {...state.comments};
      newComments2[action.payload.post_id] = action.payload.comments;
      return Object.assign({}, {...state}, {
        requested: false,
        comments: newComments2,
      });

    case GET_COMMENTS_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
