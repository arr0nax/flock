import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* getUser(action) {
  const { success, data, error } = yield* makeRequest.get(`/users/${action.payload}`);
  if (success && data) {
    yield put(actions.addUser(data));
    yield put(actions.getUserSuccess(data))
  } else {
    yield put(actions.getUserSuccess(error));
  }
  return null;
}

export default getUser;
