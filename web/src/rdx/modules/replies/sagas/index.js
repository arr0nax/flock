import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/replies/types';
import getReplies from 'rdx/modules/replies/sagas/getReplies';

function* watchRepliesSagas() {
  yield trackRequests(takeEvery, types.GET_REPLIES_REQUEST, getReplies);
}

export default watchRepliesSagas;
