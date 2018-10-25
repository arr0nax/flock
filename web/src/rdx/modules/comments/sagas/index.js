import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/comments/types';
import getComments from 'rdx/modules/comments/sagas/getComments';
import postComment from 'rdx/modules/comments/sagas/postComment';

function* watchCommentsSagas() {
  yield trackRequests(takeEvery, types.GET_COMMENTS_REQUEST, getComments);
  yield trackRequests(takeEvery, types.POST_COMMENT_REQUEST, postComment);
}

export default watchCommentsSagas;
