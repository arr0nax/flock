import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';

const executePostLogin = (payload) => {
  const root = 'http://localhost:3000/api/login'
  return Api.post(root, payload.payload).then((val) => {
    return val;
  });
};

function* postLogin(payload, action) {
  try {
    const login = yield call(executePostLogin, payload);
    if (login.error) {
      yield put({type: POST_LOGIN_FAILURE, payload: login.error});
    } else {
      yield put({type: POST_LOGIN_SUCCESS, payload: login});
    }
  } catch (error) {
    yield put({type: POST_LOGIN_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_LOGIN_REQUEST, postLogin);
}
