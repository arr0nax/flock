import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getAttachments(action) {
  const { success, data, error } = yield* makeRequest.get(`/${action.payload.type}/${action.payload.item_id}/attachments`);
  if (success) {
    yield put(actions.getAttachmentsSuccess());
    if (data.length > 0) {
      switch (action.payload.type) {
        case 'posts':
        yield put(actions.setPostAttachments(data[0]))
        break;
        case 'comments':
        yield put(actions.setCommentAttachments(data[0]))
        break;
        case 'replies':
        yield put(actions.setReplyAttachments(data[0]))
        break;
      }
    };
  } else {
    yield put(actions.getAttachmentsFailure({ error }));
  }
  return null;
}

export default getAttachments;
