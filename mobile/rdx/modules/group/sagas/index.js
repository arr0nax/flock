import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../group/types';
import getUserGroup from '../../group/sagas/getUserGroup';

function* watchGroupSagas() {
  yield trackRequests(takeEvery, types.GET_USER_GROUP_REQUEST, getUserGroup);
}

export default watchGroupSagas;
