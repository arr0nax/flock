import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getReplies(action) {
  const { success, data, error } = yield* makeRequest.get(`/comments/${action.payload}/replies`);
  if (success && data) {
    yield put(actions.setReplies({data, parent_id: action.payload}));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getReplies;
