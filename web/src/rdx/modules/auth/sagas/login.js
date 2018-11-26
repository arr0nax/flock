import { put } from 'redux-saga/effects';
import { get } from 'lodash';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* login({ payload }) {
  const { email, password } = payload;
  const { success, data, error } = yield* makeRequest.post('/login', { email, password });
  const token = get(data, 'token');
  const user = get(data, 'user');
  if (success && token) {
    yield put(actions.setAuthToken(token));
    yield put(actions.setUser(user));
    yield put(actions.addUser(user));
    yield put(actions.getNotifications());
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default login;
