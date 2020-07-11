import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../users/types';
import getUser from '../../users/sagas/getUser';
import patchUserGroup from '../../users/sagas/patchUserGroup';
import getGroupUsers from '../../users/sagas/getGroupUsers';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
  yield trackRequests(takeEvery, types.PATCH_USER_GROUP_REQUEST, patchUserGroup);
  yield trackRequests(takeEvery, types.GET_GROUP_USERS_REQUEST, getGroupUsers);
}

export default watchUsersSagas;
