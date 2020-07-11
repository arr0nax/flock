import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* patchPost(action) {
  const { success, data, error } = yield* makeRequest.patch(`/posts`, {
    ...action.payload
  });
  if (success && data) {
    yield put(actions.patchPostSuccess(data));
  } else {
    yield put(actions.patchPostFailure(error));
  }
  return null;
}

export default patchPost;
