import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

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
