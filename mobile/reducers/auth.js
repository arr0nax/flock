import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
} from '../lib/constants/actions';
import { DEFAULT_AUTH_STATE } from '../lib/constants/states';

export function auth(state = DEFAULT_AUTH_STATE, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_LOGIN_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        auth: action.payload,
        logged_in: true,
      });

    case POST_LOGIN_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error,
        logged_in: false,
      });

    case POST_LOGOUT_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_LOGOUT_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        auth: action.payload,
        logged_in: false,
        });

    case POST_LOGOUT_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error,
        });

    case POST_REGISTER_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case POST_REGISTER_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        auth: action.payload,
        logged_in: true,
      });

    case POST_REGISTER_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
