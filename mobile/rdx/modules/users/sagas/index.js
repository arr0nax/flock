import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getUser from './getUser';
import patchUserGroup from './patchUserGroup';

function* watchUsersSagas() {
  yield trackRequests(takeEvery, types.GET_USER_REQUEST, getUser);
  yield trackRequests(takeEvery, types.PATCH_USER_GROUP_REQUEST, patchUserGroup);
}

export default watchUsersSagas;
