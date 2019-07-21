import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/replies/types';
import getReplies from 'rdx/modules/replies/sagas/getReplies';
import getAllReplies from 'rdx/modules/replies/sagas/getAllReplies';
import getReplyComment from 'rdx/modules/replies/sagas/getReplyComment';
import postReply from 'rdx/modules/replies/sagas/postReply';
import deleteReply from 'rdx/modules/replies/sagas/deleteReply';

function* watchRepliesSagas() {
  yield trackRequests(takeEvery, types.GET_REPLIES_REQUEST, getReplies);
  yield trackRequests(takeEvery, types.GET_ALL_REPLIES_REQUEST, getAllReplies);
  yield trackRequests(takeEvery, types.GET_REPLY_COMMENT_REQUEST, getReplyComment);
  yield trackRequests(takeEvery, types.POST_REPLY_REQUEST, postReply);
  yield trackRequests(takeEvery, types.DELETE_REPLY_REQUEST, deleteReply);
}

export default watchRepliesSagas;
