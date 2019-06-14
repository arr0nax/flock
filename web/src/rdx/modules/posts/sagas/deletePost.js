import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* deletePost(action) {
  const { success, data, error } = yield* makeRequest.delete(`/posts/${action.payload}`);
  if (success && data) {
    yield put(actions.deletePostSuccess(data));
  } else {
    yield put(actions.deletePostFailure(error));
  }
  return null;
}

export default deletePost;
