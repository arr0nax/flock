import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import constructQueryParams from 'mobile/rdx/utils/constructQueryParams';
import actions from 'mobile/rdx/actions';

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
