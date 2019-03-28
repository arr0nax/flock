import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postComments(action) {
  const { success, data, error } = yield* makeRequest.post(`/posts/${action.payload.post_id}/comments`, {
    text: action.payload.text
  });
  if (success && data) {
    yield put(actions.addComment({data, parent_id: action.payload.post_id}));
  } else {
    yield put(actions.postCommentFailure(error));
  }
  return null;
}

export default postComments;
