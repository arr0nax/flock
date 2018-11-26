import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/users/types';
import getUser from 'rdx/modules/users/sagas/getUser';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
}

export default watchUsersSagas;
