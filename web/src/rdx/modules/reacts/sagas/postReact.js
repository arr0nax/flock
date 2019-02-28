import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postReacts(action) {
  const { success, data, error } = yield* makeRequest.post(`/reacts`, action.payload);
  if (success && data) {
    // yield put(actions.setReplies({data, parent_id: action.payload}));
    switch (data.item_type) {
      case 'post':
        yield put(actions.getReacts({type: 'posts', item_id: data.item_id}));
        break;
      case 'comment':
        yield put(actions.getReacts({type: 'comments', item_id: data.item_id}));
        break;
      case 'reply':
        yield put(actions.getReacts({type: 'replies', item_id: data.item_id}));
        break;
    }
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postReacts;
