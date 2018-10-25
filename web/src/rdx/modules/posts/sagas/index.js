import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/posts/types';
import getPosts from 'rdx/modules/posts/sagas/getPosts';
import postPost from 'rdx/modules/posts/sagas/postPost';

function* watchPostsSagas() {
  yield trackRequests(takeEvery, types.GET_POSTS_REQUEST, getPosts);
  yield trackRequests(takeEvery, types.POST_POST_REQUEST, postPost);
}

export default watchPostsSagas;
