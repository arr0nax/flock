import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getGroupUsers(action) {
  const { success, data, error } = yield* makeRequest.get(`/groups/${action.payload}/users`);
  if (success && data) {
    yield put(actions.getGroupUsersSuccess(data))
  } else {
    yield put(actions.getGroupUsersSuccess(error));
  }
  return null;
}

export default getGroupUsers;
