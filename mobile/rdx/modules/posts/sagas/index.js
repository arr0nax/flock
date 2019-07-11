import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getPost from './getPost';
import getPosts from './getPosts';
import getMorePosts from './getMorePosts';
import postPost from './postPost';

function* watchPostsSagas() {
  yield trackRequests(takeEvery, types.GET_POSTS_REQUEST, getPosts);
  yield trackRequests(takeEvery, types.GET_POST_REQUEST, getPost);
  yield trackRequests(takeEvery, types.GET_MORE_POSTS_REQUEST, getMorePosts);
  yield trackRequests(takeEvery, types.POST_POST_REQUEST, postPost);
}

export default watchPostsSagas;
