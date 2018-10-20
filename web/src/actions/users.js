import {
  GET_USER_REQUEST,
} from '../lib/constants/actions';

export function getUser(payload) {
  return {
    type: GET_USER_REQUEST,
    payload
  }
}
