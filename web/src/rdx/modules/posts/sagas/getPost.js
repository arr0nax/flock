import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import constructQueryParams from 'rdx/utils/constructQueryParams';
import actions from 'rdx/actions';

function* getPost(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}`);
  if (success && data) {
    yield put(actions.getPostSuccess(data));
    yield put(actions.getComments(data.id))
    yield put (actions.getUser(data.user_id))
    yield put(actions.getReacts({item_id: data.id, type: 'posts'}))
  } else {
    yield put(actions.getPostFailure({ error }));
  }
  return null;
}

export default getPost;
