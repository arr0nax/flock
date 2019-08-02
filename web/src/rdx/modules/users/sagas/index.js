import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/users/types';
import getUser from 'rdx/modules/users/sagas/getUser';
import patchUserGroup from 'rdx/modules/users/sagas/patchUserGroup';
import getGroupUsers from 'rdx/modules/users/sagas/getGroupUsers';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
  yield trackRequests(takeEvery, types.PATCH_USER_GROUP_REQUEST, patchUserGroup);
  yield trackRequests(takeEvery, types.GET_GROUP_USERS_REQUEST, getGroupUsers);
}

export default watchUsersSagas;
