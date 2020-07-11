import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* getAllComments(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}/comments/all`);
  if (success && data) {
    yield put(actions.getAllCommentsSuccess({data, parent_id: action.payload}));
    yield put(actions.setComments({data, parent_id: action.payload}));
    yield all(data.map(comment => {
      return put(actions.getAllReplies(comment.id))
    }))
    yield all(data.map(post => {
      return put(actions.getReacts({item_id: post.id, type: 'comments'}))
    }))
    yield all(data.map(post => {
      return put(actions.getAttachments({item_id: post.id, type: 'comments'}))
    }))
    yield all(data.map(post => {
      return put(actions.getUser(post.user_id))
    }))
  } else {
    yield put(actions.getAllCommentsFailure({ error }));
  }
  return null;
}

export default getAllComments;
