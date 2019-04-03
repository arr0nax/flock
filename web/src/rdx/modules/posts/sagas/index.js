import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/posts/types';
import getPost from 'rdx/modules/posts/sagas/getPost';
import getPosts from 'rdx/modules/posts/sagas/getPosts';
import getMorePosts from 'rdx/modules/posts/sagas/getMorePosts';
import postPost from 'rdx/modules/posts/sagas/postPost';

function* watchPostsSagas() {
  yield trackRequests(takeEvery, types.GET_POSTS_REQUEST, getPosts);
  yield trackRequests(takeEvery, types.GET_POST_REQUEST, getPost);
  yield trackRequests(takeEvery, types.GET_MORE_POSTS_REQUEST, getMorePosts);
  yield trackRequests(takeEvery, types.POST_POST_REQUEST, postPost);
}

export default watchPostsSagas;
