import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* postComments(action) {
  const { success, data, error } = yield* makeRequest.post(`/posts/${action.payload.post_id}/comments`, {
    text: action.payload.text
  });
  if (success && data) {
    yield put(actions.addComment({data, parent_id: action.payload.post_id}));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postComments;
