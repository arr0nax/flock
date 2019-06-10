import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getComments(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}/comments`);
  if (success && data) {
    yield put(actions.getCommentsSuccess({data, parent_id: action.payload}));
    yield put(actions.setComments({data, parent_id: action.payload}));
    yield all(data.map(comment => {
      return put(actions.getReplies(comment.id))
    }))
    yield all(data.map(post => {
      return put(actions.getReacts({item_id: post.id, type: 'comments'}))
    }))
    yield all(data.map(post => {
      return put(actions.getUser(post.user_id))
    }))
  } else {
    yield put(actions.getCommentsFailure({ error }));
  }
  return null;
}

export default getComments;
