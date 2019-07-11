import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
