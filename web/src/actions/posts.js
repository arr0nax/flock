import {
  POST_POST_REQUEST,
  GET_POSTS_REQUEST,
} from '../lib/constants/actions';

export function post(payload) {
  return {
    type: POST_POST_REQUEST,
    payload
  }
}

export function getPosts(payload) {
  return {
    type: GET_POSTS_REQUEST,
    payload
  }
}
