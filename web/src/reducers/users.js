import {
  GET_REACTS_REQUEST,
  GET_POST_REACTS_SUCCESS,
  GET_COMMENT_REACTS_SUCCESS,
  GET_REPLY_REACTS_SUCCESS,
  GET_REACTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_REPLIES_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../lib/constants/actions';
import { DEFAULT_USERS_STATE } from '../lib/constants/states';

export function users(state = DEFAULT_USERS_STATE, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      const newUsers1 = {...state.users};
      action.payload.map(post => {
        if (!newUsers1[post.user_id]) {
          newUsers1[post.user_id] = {};
        }
      });
      return Object.assign({}, {...state}, {
        users: newUsers1
      });

    case GET_COMMENTS_SUCCESS:
      const newUsers2 = {...state.users};
      action.payload.comments.map(post => {
        if (!newUsers2[post.user_id]) {
          newUsers2[post.user_id] = {};
        }
      });
      return Object.assign({}, {...state}, {
        users: newUsers2
      });

    case GET_REPLIES_SUCCESS:
      const newUsers3 = {...state.users};
      action.payload.replies.map(post => {
        if (!newUsers3[post.user_id]) {
          newUsers3[post.user_id] = {};
        }
      });
      return Object.assign({}, {...state}, {
        users: newUsers3
      });

    case GET_USER_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_USER_SUCCESS:
      const newUsers4 = {...state.users};
      newUsers4[action.payload.id] = action.payload;
      return Object.assign({}, {...state}, {
        requested: false,
        users: newUsers4
      });

    case GET_USER_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
