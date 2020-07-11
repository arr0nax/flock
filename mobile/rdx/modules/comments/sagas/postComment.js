import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* postComments(action) {
  const { success, data, error } = yield* makeRequest.post(`/posts/${action.payload.post_id}/comments`, {
    text: action.payload.text
  });
  if (success && data) {
    // yield put(actions.addComment({data, parent_id: action.payload.post_id}));
    if (action.payload.attachment) {
      yield put(actions.postAttachment({
        attachment: action.payload.attachment,
        item_id: data.id,
        item_type: 'comment',
      }))
    }
  } else {
    yield put(actions.postCommentFailure(error));
  }
  return null;
}

export default postComments;
