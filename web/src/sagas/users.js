import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api'; import { API_ENDPOINT } from '../lib/constants/api';

const executeGetUser = (payload) => {
  const root = API_ENDPOINT+`/users/${payload.payload}`
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getUser(payload, action) {
  try {
    const users = yield call(executeGetUser, payload);
    if (users.error) {
      yield put({type: GET_USER_FAILURE, payload: users.error});
    } else {
      yield put({type: GET_USER_SUCCESS, payload: users});
    }
  } catch (error) {
    yield put({type: GET_USER_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchUsers() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}
