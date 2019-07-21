import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* deleteComment(action) {
  const { item_id, parent_id } = action.payload;
  const { success, data, error } = yield* makeRequest.delete(`/comments/${item_id}`);
  if (success && data) {
    yield put(actions.deleteCommentSuccess({item_id, parent_id}));
  } else {
    yield put(actions.deleteCommentFailure(error));
  }
  return null;
}

export default deleteComment;
