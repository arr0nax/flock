import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
} from '../lib/constants/actions';
import { DEFAULT_LOGIN_STATE } from '../lib/constants/states';

export function auth(state = DEFAULT_LOGIN_STATE, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_LOGIN_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        auth: action.payload,
      });

    case POST_LOGIN_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
