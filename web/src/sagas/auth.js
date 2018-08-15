import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILURE,
  GET_POSTS_REQUEST,
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
      yield put({type: GET_POSTS_REQUEST})
    }
  } catch (error) {
    yield put({type: POST_LOGIN_FAILURE, payload: error});
    console.warn(error);
  }
}

const executePostLogout = (payload) => {
  sessionStorage.setItem('jwtToken', 'nope');
  return {};
};

function* postLogout(payload, action) {
  try {
    const login = yield call(executePostLogout, payload);
    if (login.error) {
      yield put({type: POST_LOGOUT_FAILURE, payload: login});
    } else {
      yield put({type: POST_LOGOUT_SUCCESS, payload: login});
    }
  } catch (error) {
    yield put({type: POST_LOGOUT_FAILURE, payload: error});
    console.warn(error);
  }
}

const executePostRegister = (payload) => {
  const root = 'http://localhost:3000/api/register'
  return Api.post(root, payload.payload).then((val) => {
    return val;
  });
};

function* postRegister(payload, action) {
  try {
    const login = yield call(executePostRegister, payload);
    if (login.error) {
      yield put({type: POST_REGISTER_FAILURE, payload: login.error});
    } else {
      yield put({type: POST_REGISTER_SUCCESS, payload: login});
    }
  } catch (error) {
    yield put({type: POST_REGISTER_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_LOGIN_REQUEST, postLogin);
  yield takeLatest(POST_LOGOUT_REQUEST, postLogout);
  yield takeLatest(POST_REGISTER_REQUEST, postRegister);
}
