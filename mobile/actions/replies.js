import {
  POST_REPLY_REQUEST,
  GET_REPLIES_REQUEST,
} from '../lib/constants/actions';

export function reply(payload) {
  return {
    type: POST_REPLY_REQUEST,
    payload
  }
}

export function getReplies(payload) {
  return {
    type: GET_REPLIES_REQUEST,
    payload
  }
}
