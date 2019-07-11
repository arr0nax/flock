import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getComments from './getComments';
import getCommentPost from './getCommentPost';
import postComment from './postComment';

function* watchCommentsSagas() {
  yield trackRequests(takeEvery, types.GET_COMMENTS_REQUEST, getComments);
  yield trackRequests(takeEvery, types.POST_COMMENT_REQUEST, postComment);
  yield trackRequests(takeEvery, types.GET_COMMENT_POST_REQUEST, getCommentPost);
}

export default watchCommentsSagas;
