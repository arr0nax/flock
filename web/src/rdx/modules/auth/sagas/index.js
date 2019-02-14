import { takeLatest } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/auth/types';
import login from 'rdx/modules/auth/sagas/login';
import logout from 'rdx/modules/auth/sagas/logout';
import register from 'rdx/modules/auth/sagas/register';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.LOGIN_REQUEST, login);
  yield trackRequests(takeLatest, types.REQUEST_LOGOUT, logout);
  yield trackRequests(takeLatest, types.REQUEST_REGISTER, register);
}

export default watchAuthSagas;
