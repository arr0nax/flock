import { takeLatest } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/auth/types';
import login from 'mobile/rdx/modules/auth/sagas/login';
import logout from 'mobile/rdx/modules/auth/sagas/logout';
import register from 'mobile/rdx/modules/auth/sagas/register';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.REQUEST_LOGIN, login);
  yield trackRequests(takeLatest, types.REQUEST_LOGOUT, logout);
  yield trackRequests(takeLatest, types.REQUEST_REGISTER, register);
}

export default watchAuthSagas;
