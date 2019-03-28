import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getReacts(action) {
  const { success, data, error } = yield* makeRequest.get(`/${action.payload.type}/${action.payload.item_id}/reacts`);
  if (success) {
    yield put(actions.getReactsSuccess());
    switch (action.payload.type) {
      case 'posts':
        yield put(actions.setPostReacts({parent_id: action.payload.item_id, data}))
        break;
      case 'comments':
        yield put(actions.setCommentReacts({parent_id: action.payload.item_id, data}))
        break;
      case 'replies':
        yield put(actions.setReplyReacts({parent_id: action.payload.item_id, data}))
        break;
    }
  } else {
    yield put(actions.getReactsFailure({ error }));
  }
  return null;
}

export default getReacts;
