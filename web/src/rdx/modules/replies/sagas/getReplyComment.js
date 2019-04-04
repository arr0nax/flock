import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getReplyComment(action) {
  const { success, data, error } = yield* makeRequest.get(`/replies/${action.payload}`);
  if (success && data) {
    yield put(actions.getReplyCommentSuccess(data));
    yield put(actions.getCommentPost(data.comment_id));
  } else {
    yield put(actions.getReplyCommentFailure({ error }));
  }
  return null;
}

export default getReplyComment;
