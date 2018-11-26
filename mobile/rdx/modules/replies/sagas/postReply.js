import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* postReplies(action) {
  const { success, data, error } = yield* makeRequest.post(`/comments/${action.payload.comment_id}/replies`, {
    text: action.payload.text
  });
  if (success && data) {
    yield put(actions.addReply({data, parent_id: action.payload.comment_id}));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postReplies;
