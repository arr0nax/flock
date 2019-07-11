import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getReplies from './getReplies';
import getReplyComment from './getReplyComment';
import postReply from './postReply';

function* watchRepliesSagas() {
  yield trackRequests(takeEvery, types.GET_REPLIES_REQUEST, getReplies);
  yield trackRequests(takeEvery, types.GET_REPLY_COMMENT_REQUEST, getReplyComment);
  yield trackRequests(takeEvery, types.POST_REPLY_REQUEST, postReply);
}

export default watchRepliesSagas;
