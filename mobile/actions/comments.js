import {
  POST_COMMENT_REQUEST,
  GET_COMMENTS_REQUEST,
} from '../lib/constants/actions';

export function comment(payload) {
  return {
    type: POST_COMMENT_REQUEST,
    payload
  }
}

export function getComments(payload) {
  return {
    type: GET_COMMENTS_REQUEST,
    payload
  }
}
