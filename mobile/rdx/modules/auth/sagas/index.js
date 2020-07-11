import { takeLatest } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../auth/types';
import login from '../../auth/sagas/login';
import logout from '../../auth/sagas/logout';
import register from '../../auth/sagas/register';

function* watchAuthSagas() {
  yield trackRequests(takeLatest, types.LOGIN_REQUEST, login);
  yield trackRequests(takeLatest, types.LOGOUT_REQUEST, logout);
  yield trackRequests(takeLatest, types.REGISTER_REQUEST, register);
}

export default watchAuthSagas;
