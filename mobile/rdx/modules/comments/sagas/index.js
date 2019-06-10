import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/comments/types';
import getComments from 'mobile/rdx/modules/comments/sagas/getComments';
import getCommentPost from 'mobile/rdx/modules/comments/sagas/getCommentPost';
import postComment from 'mobile/rdx/modules/comments/sagas/postComment';

function* watchCommentsSagas() {
  yield trackRequests(takeEvery, types.GET_COMMENTS_REQUEST, getComments);
  yield trackRequests(takeEvery, types.POST_COMMENT_REQUEST, postComment);
  yield trackRequests(takeEvery, types.GET_COMMENT_POST_REQUEST, getCommentPost);
}

export default watchCommentsSagas;
