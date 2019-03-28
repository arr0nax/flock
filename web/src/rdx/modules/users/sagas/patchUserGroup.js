import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* patchUserGroup(action) {
  const { success, data, error } = yield* makeRequest.patch(`/users/group`, {code: action.payload});
  if (success && data) {
    // yield put(actions.addUser(data));
    yield put(actions.getPosts())
  } else {
    yield put(actions.patchUserGroupFailure);
  }
  return null;
}

export default patchUserGroup;
