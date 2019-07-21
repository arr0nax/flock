import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/comments/types';
import deleteComment from 'rdx/modules/comments/sagas/deleteComment';
import getComments from 'rdx/modules/comments/sagas/getComments';
import getAllComments from 'rdx/modules/comments/sagas/getAllComments';
import getCommentPost from 'rdx/modules/comments/sagas/getCommentPost';
import postComment from 'rdx/modules/comments/sagas/postComment';

function* watchCommentsSagas() {
  yield trackRequests(takeEvery, types.DELETE_COMMENT_REQUEST, deleteComment);
  yield trackRequests(takeEvery, types.GET_COMMENTS_REQUEST, getComments);
  yield trackRequests(takeEvery, types.GET_ALL_COMMENTS_REQUEST, getAllComments);
  yield trackRequests(takeEvery, types.POST_COMMENT_REQUEST, postComment);
  yield trackRequests(takeEvery, types.GET_COMMENT_POST_REQUEST, getCommentPost);
}

export default watchCommentsSagas;
