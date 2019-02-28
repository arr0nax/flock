import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/users/types';
import getUser from 'mobile/rdx/modules/users/sagas/getUser';
import patchUserGroup from 'mobile/rdx/modules/users/sagas/patchUserGroup';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
  yield trackRequests(takeEvery, types.PATCH_USER_GROUP_REQUEST, patchUserGroup);
}

export default watchUsersSagas;
