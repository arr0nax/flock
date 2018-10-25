import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/reacts/types';
import getReacts from 'rdx/modules/reacts/sagas/getReacts';

function* watchReactsSagas() {
  yield trackRequests(takeEvery, types.GET_REACTS_REQUEST, getReacts);
}

export default watchReactsSagas;
