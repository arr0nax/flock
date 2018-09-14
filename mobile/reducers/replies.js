import {
  POST_REPLY_REQUEST,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAILURE,
  GET_REPLIES_REQUEST,
  GET_REPLIES_SUCCESS,
  GET_REPLIES_FAILURE,
  GET_COMMENTS_SUCCESS,
  POST_COMMENT_SUCCESS,
} from '../lib/constants/actions';
import { DEFAULT_REPLIES_STATE } from '../lib/constants/states';

export function reply(state = {}, action) {
  switch (action.type) {
    case POST_REPLY_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_REPLY_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        reply: action.payload,
      });

    case POST_REPLY_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}

export function replies(state = DEFAULT_REPLIES_STATE, action) {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      const newReplies1 = {...state.replies};
      action.payload.comments.map(comment => newReplies1[comment.id] = []);
      return Object.assign({}, {...state}, {
        requested: true,
        replies: newReplies1,
      });
    case POST_COMMENT_SUCCESS:
      const newReplies4 = {...state.replies};
      newReplies4[action.payload.id] = [];
      return Object.assign({}, {...state}, {
        requested: true,
        replies: newReplies4,
      });

    case POST_REPLY_SUCCESS:
      const newReplies3 = {...state.replies};
      newReplies3[action.payload.comment_id].push(action.payload);
      return Object.assign({}, {...state}, {
        requested: true,
        replies: newReplies3,
      });

    case GET_REPLIES_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_REPLIES_SUCCESS:
      const newReplies2 = {...state.replies};
      newReplies2[action.payload.comment_id] = action.payload.replies;
      return Object.assign({}, {...state}, {
        requested: false,
        replies: newReplies2,
      });

    case GET_REPLIES_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
