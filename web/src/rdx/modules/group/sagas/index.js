import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/group/types';
import getUserGroup from 'rdx/modules/group/sagas/getUserGroup';

function* watchGroupSagas() {
  yield trackRequests(takeEvery, types.GET_USER_GROUP_REQUEST, getUserGroup);
}

export default watchGroupSagas;
