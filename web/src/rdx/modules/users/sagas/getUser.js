import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getUser(action) {
  const { success, data, error } = yield* makeRequest.get(`/users/${action.payload}`);
  if (success && data) {
    yield put(actions.addUser(data));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getUser;
