import {
  POST_REACT_REQUEST,
  GET_REACTS_REQUEST,
} from '../lib/constants/actions';

export function react(payload) {
  return {
    type: POST_REACT_REQUEST,
    payload
  }
}

export function getReacts(payload) {
  return {
    type: GET_REACTS_REQUEST,
    payload
  }
}
