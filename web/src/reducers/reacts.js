import {
  POST_REACT_REQUEST,
  POST_REACT_SUCCESS,
  POST_POST_SUCCESS,
  POST_COMMENT_SUCCESS,
  POST_REPLY_SUCCESS,
  POST_REACT_FAILURE,
  GET_REACTS_REQUEST,
  GET_POST_REACTS_SUCCESS,
  GET_COMMENT_REACTS_SUCCESS,
  GET_REPLY_REACTS_SUCCESS,
  GET_REACTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_REPLIES_SUCCESS,
} from '../lib/constants/actions';
import { DEFAULT_REACTS_STATE } from '../lib/constants/states';

export function react(state = {}, action) {
  switch (action.type) {
    case POST_REACT_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_REACT_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        react: action.payload,
      });

    case POST_REACT_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}

export function reacts(state = DEFAULT_REACTS_STATE, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      const newReacts1 = {...state.post_reacts};
      action.payload.map(post => newReacts1[post.id] = []);
      return Object.assign({}, {...state}, {
        requested: true,
        post_reacts: newReacts1,
      });

    case GET_COMMENTS_SUCCESS:
      const newReacts2 = {...state.comment_reacts};
      action.payload.comments.map(comment => newReacts2[comment.id] = []);
      return Object.assign({}, {...state}, {
        requested: true,
        comment_reacts: newReacts2,
      });

    case GET_REPLIES_SUCCESS:
      const newReacts3 = {...state.reply_reacts};
      action.payload.replies.map(replies => newReacts3[replies.id] = []);
      return Object.assign({}, {...state}, {
        requested: true,
        reply_reacts: newReacts3,
      });

    case POST_POST_SUCCESS:
      const newReacts7 = {...state.post_reacts};
      newReacts7[action.payload.id] = [];
      return Object.assign({}, {...state}, {
        requested: true,
        post_reacts: newReacts7,
      });

    case POST_COMMENT_SUCCESS:
      const newReacts8 = {...state.comment_reacts};
      newReacts8[action.payload.id] = [];
      return Object.assign({}, {...state}, {
        requested: true,
        comment_reacts: newReacts8,
      });

    case POST_REPLY_SUCCESS:
      const newReacts9 = {...state.reply_reacts};
      newReacts9[action.payload.id] = [];
      return Object.assign({}, {...state}, {
        requested: true,
        reply_reacts: newReacts9,
      });

    case GET_REACTS_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_POST_REACTS_SUCCESS:
      const newReacts = {...state.post_reacts};
      newReacts[action.payload.item_id] = [
        ...newReacts[action.payload.item_id],
        action.payload,
      ];
      return Object.assign({}, {...state}, {
        requested: false,
        post_reacts: newReacts,
      });
    case GET_COMMENT_REACTS_SUCCESS:
      const newReacts4 = {...state.comment_reacts};
      newReacts4[action.payload.item_id] = [
        ...newReacts4[action.payload.item_id],
        action.payload,
      ];
      return Object.assign({}, {...state}, {
        requested: false,
        comment_reacts: newReacts4,
      });
    case GET_REPLY_REACTS_SUCCESS:
      const newReacts5 = {...state.reply_reacts};
      newReacts5[action.payload.item_id] = [
        ...newReacts5[action.payload.item_id],
        action.payload,
      ];
      return Object.assign({}, {...state}, {
        requested: false,
        reply_reacts: newReacts5,
      });

    case GET_REACTS_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    case POST_REACT_SUCCESS:
      let newReacts6;
      if (action.payload.type === "post") {
        newReacts6 = {...state.post_reacts};
      } else if (action.payload.type === "comment") {
        newReacts6 = {...state.comment_reacts};
      } else if (action.payload.type === "reply") {
        newReacts6 = {...state.reply_reacts};
      }
      newReacts6[action.payload.item_id] = [
        ...newReacts6[action.payload.item_id],
        action.payload,
      ];
      if (action.payload.type === "post") {
        return Object.assign({}, {...state}, {
          requested: false,
          post_reacts: newReacts6,
        });
      } else if (action.payload.type === "comment") {
        return Object.assign({}, {...state}, {
          requested: false,
          comment_reacts: newReacts6,
        });
      } else if (action.payload.type === "reply") {
        return Object.assign({}, {...state}, {
          requested: false,
          reply_reacts: newReacts6,
        });
      }

    default:
      return state;
  }
}
