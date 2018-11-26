import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/replies/types';
import getReplies from 'mobile/rdx/modules/replies/sagas/getReplies';
import postReply from 'mobile/rdx/modules/replies/sagas/postReply';

function* watchRepliesSagas() {
  yield trackRequests(takeEvery, types.GET_REPLIES_REQUEST, getReplies);
  yield trackRequests(takeEvery, types.POST_REPLY_REQUEST, postReply);
}

export default watchRepliesSagas;
