import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getAllReplies(action) {
  const { success, data, error } = yield* makeRequest.get(`/comments/${action.payload}/replies/all`);
  if (success && data) {
    yield put(actions.getAllRepliesSuccess({data, parent_id: action.payload}));
    yield put(actions.setReplies({data, parent_id: action.payload}));
    yield all(data.map(reply => {
      return put(actions.getReacts({item_id: reply.id, type: 'replies'}))
    }))
    yield all(data.map(post => {
      return put(actions.getAttachments({item_id: post.id, type: 'replies'}))
    }))
    yield all(data.map(reply => {
      return put(actions.getUser(reply.user_id))
    }))
  } else {
    yield put(actions.getAllRepliesFailure(error));
  }
  return null;
}

export default getAllReplies;
