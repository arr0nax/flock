import {
  POST_LOGIN_REQUEST,
  POST_REGISTER_REQUEST,
  POST_LOGOUT_REQUEST,
} from '../lib/constants/actions';

export function login(payload) {
  return {
    type: POST_LOGIN_REQUEST,
    payload
  }
}

export function logout(payload) {
  return {
    type: POST_LOGOUT_REQUEST,
    payload
  }
}

export function register(payload) {
  return {
    type: POST_REGISTER_REQUEST,
    payload
  }
}
