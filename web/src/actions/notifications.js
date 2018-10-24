import {
  GET_NOTIFICATIONS_REQUEST,
} from '../lib/constants/actions';

export function getNotifications(payload) {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
    payload
  }
}
