import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from '../lib/constants/actions';
import { DEFAULT_NOTIFICATIONS_STATE } from '../lib/constants/states';

export function notifications(state = DEFAULT_NOTIFICATIONS_STATE, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return Object.assign({}, {...state}, {
        requested: true
      });

    case GET_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, {...state}, {
        requested: false,
        notifications: action.payload,
      });

    case GET_NOTIFICATIONS_FAILURE:
      return Object.assign({}, {...state}, {
        requested: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}
