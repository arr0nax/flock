import { takeLatest } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/auth/types';
import login from 'rdx/modules/auth/sagas/login';
import logout from 'rdx/modules/auth/sagas/logout';
import register from 'rdx/modules/auth/sagas/register';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.LOGIN_REQUEST, login);
  yield trackRequests(takeLatest, types.LOGOUT_REQUEST, logout);
  yield trackRequests(takeLatest, types.REGISTER_REQUEST, register);
}

export default watchAuthSagas;
