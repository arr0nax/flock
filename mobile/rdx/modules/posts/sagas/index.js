import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/posts/types';
import getPosts from 'mobile/rdx/modules/posts/sagas/getPosts';
import postPost from 'mobile/rdx/modules/posts/sagas/postPost';

function* watchPostsSagas() {
  yield trackRequests(takeEvery, types.GET_POSTS_REQUEST, getPosts);
  yield trackRequests(takeEvery, types.POST_POST_REQUEST, postPost);
}

export default watchPostsSagas;
