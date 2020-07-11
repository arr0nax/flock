import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* postReplies(action) {
  const { success, data, error } = yield* makeRequest.post(`/comments/${action.payload.comment_id}/replies`, {
    text: action.payload.text
  });
  if (success && data) {
    // yield put(actions.addReply({data, parent_id: action.payload.comment_id}));
    if (action.payload.attachment) {
      yield put(actions.postAttachment({
        attachment: action.payload.attachment,
        item_id: data.id,
        item_type: 'reply',
      }))
    }
  } else {
    yield put(actions.postReplyFailure(error));
  }
  return null;
}

export default postReplies;
