import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* logout() {
  const { success, data, error } = yield* makeRequest.get('/logout');
  if (success) {
    yield put(actions.setUser(data));
    yield put(actions.setAuthToken(''));
    yield put(actions.logoutSuccess());
  } else {
    yield put(actions.logoutFailure(error));
    return getErrorActions({ error });
  }
  return null;
}

export default logout;
