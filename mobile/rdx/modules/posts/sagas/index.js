import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../posts/types';
import getPost from '../../posts/sagas/getPost';
import getReportedPost from '../../posts/sagas/getReportedPost';
import getPosts from '../../posts/sagas/getPosts';
import getMorePosts from '../../posts/sagas/getMorePosts';
import postPost from '../../posts/sagas/postPost';
import deletePost from '../../posts/sagas/deletePost';
import patchPost from '../../posts/sagas/patchPost';

function* watchPostsSagas() {
  yield trackRequests(takeEvery, types.GET_POSTS_REQUEST, getPosts);
  yield trackRequests(takeEvery, types.GET_REPORTED_POST_REQUEST, getReportedPost);
  yield trackRequests(takeEvery, types.GET_POST_REQUEST, getPost);
  yield trackRequests(takeEvery, types.GET_MORE_POSTS_REQUEST, getMorePosts);
  yield trackRequests(takeEvery, types.POST_POST_REQUEST, postPost);
  yield trackRequests(takeEvery, types.DELETE_POST_REQUEST, deletePost);
  yield trackRequests(takeEvery, types.PATCH_POST_REQUEST, patchPost);
}

export default watchPostsSagas;
