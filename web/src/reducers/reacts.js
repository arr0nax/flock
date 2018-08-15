import {
  POST_REACT_REQUEST,
  POST_REACT_SUCCESS,
  POST_REACT_FAILURE,
  GET_REACTS_REQUEST,
  GET_REACTS_SUCCESS,
  GET_REACTS_FAILURE,
  GET_POSTS_SUCCESS,
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
      const newReacts1 = {...state.reacts};
      action.payload.map(post => newReacts1[post._id] = {});
      return Object.assign({}, {...state}, {
        requested: true,
        reacts: newReacts1,
      });

    case GET_REACTS_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_REACTS_SUCCESS:
      const newReacts = {...state.reacts};
      newReacts[action.payload._item] = action.payload;
      return Object.assign({}, {...state}, {
        requested: false,
        reacts: newReacts,
      });

    case GET_REACTS_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
