import {
  POST_LOGIN_REQUEST,
  POST_REGISTER_REQUEST,
} from '../lib/constants/actions';

export function login(payload) {
  return {
    type: POST_LOGIN_REQUEST,
    payload
  }
}

export function register(payload) {
  return {
    type: POST_LOGIN_REQUEST,
    payload
  }
}
