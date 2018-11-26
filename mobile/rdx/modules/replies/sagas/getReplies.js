import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getReplies(action) {
  const { success, data, error } = yield* makeRequest.get(`/comments/${action.payload}/replies`);
  if (success && data) {
    yield put(actions.setReplies({data, parent_id: action.payload}));
    yield all(data.map(reply => {
      return put(actions.getReacts({item_id: reply.id, type: 'replies'}))
    }))
    yield all(data.map(reply => {
      return put(actions.getUser(reply.user_id))
    }))
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getReplies;
