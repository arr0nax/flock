import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import constructQueryParams from '../../../utils/constructQueryParams';
import actions from '../../../actions';

function* getReportedPost(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}`);
  if (success && data) {
    yield put(actions.getReportedPostSuccess(data));
    yield put(actions.getAllComments(data.id))
    yield put (actions.getUser(data.user_id))
    yield put(actions.getReacts({item_id: data.id, type: 'posts'}))
  } else {
    yield put(actions.getReportedPostFailure({ error }));
  }
  return null;
}

export default getReportedPost;
