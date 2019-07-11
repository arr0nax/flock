import { takeLatest } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import login from './login';
import logout from './logout';
import register from './register';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.LOGIN_REQUEST, login);
  yield trackRequests(takeLatest, types.LOGOUT_REQUEST, logout);
  yield trackRequests(takeLatest, types.REGISTER_REQUEST, register);
}

export default watchAuthSagas;
