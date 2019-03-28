import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* logout() {
  const { success, data, error } = yield* makeRequest.get('/logout');
  if (success) {
    yield put(actions.setUser(data));
    yield put(actions.setAuthToken(''));
    yield put(actions.logoutSuccess());
  } else {
    yield put(actions.setUser({}));
    yield put(actions.setAuthToken(''));
    yield put(actions.logoutFailure(error));
    return getErrorActions({ error });
  }
  return null;
}

export default logout;
