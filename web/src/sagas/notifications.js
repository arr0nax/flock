import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';
import { API_ENDPOINT } from '../lib/constants/api';

const executeGetNotifications = (payload) => {
  let root = `${API_ENDPOINT}/notifications`
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getNotifications(payload, action) {
  try {
    const notifs = yield call(executeGetNotifications, payload);
    if (notifs.error) {
      yield put({type: GET_NOTIFICATIONS_FAILURE, payload: notifs.error});
    } else {
      yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: notifs});
    }
  } catch (error) {
    yield put({type: GET_NOTIFICATIONS_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchNotifications() {
  yield takeEvery(GET_NOTIFICATIONS_REQUEST, getNotifications);
}
