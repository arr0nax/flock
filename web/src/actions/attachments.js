import {
  POST_ATTACHMENT_REQUEST,
} from '../lib/constants/actions';

export function postAttachment(payload) {
  return {
    type: POST_ATTACHMENT_REQUEST,
    payload
  }
}
