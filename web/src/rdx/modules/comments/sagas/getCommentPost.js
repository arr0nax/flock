import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getCommentPost(action) {
  const { success, data, error } = yield* makeRequest.get(`/comments/${action.payload}`);
  if (success && data) {
    yield put(actions.getCommentPostSuccess(data));
    yield put(actions.getPost(data.post_id));
  } else {
    yield put(actions.getCommentPostFailure({ error }));
  }
  return null;
}

export default getCommentPost;
