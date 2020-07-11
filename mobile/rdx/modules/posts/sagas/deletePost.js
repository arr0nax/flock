import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* deletePost(action) {
  const { success, data, error } = yield* makeRequest.delete(`/posts/${action.payload}`);
  if (success && data) {
    yield put(actions.deletePostSuccess(action.payload));
  } else {
    yield put(actions.deletePostFailure(error));
  }
  return null;
}

export default deletePost;
