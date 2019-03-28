import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getUser(action) {
  const { success, data, error } = yield* makeRequest.get(`/users/${action.payload}`);
  if (success && data) {
    yield put(actions.addUser(data));
    yield put(actions.getUserSuccess(data))
  } else {
    return actions.getUserSuccess({ error });
  }
  return actions.getUserSuccess({ error });
}

export default getUser;
