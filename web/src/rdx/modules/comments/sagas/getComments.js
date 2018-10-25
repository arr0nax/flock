import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getComments(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}/comments`);
  if (success && data) {
    yield put(actions.setComments({data, parent_id: action.payload}));
    yield all(data.map(comment => {
      return put(actions.getReplies(comment.id))
    }))
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getComments;
