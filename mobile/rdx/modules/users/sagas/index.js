import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/users/types';
import getUser from 'mobile/rdx/modules/users/sagas/getUser';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
}

export default watchUsersSagas;
