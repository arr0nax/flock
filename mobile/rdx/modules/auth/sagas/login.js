import { put } from 'redux-saga/effects';
import get from 'lodash/get';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* login({ payload }) {
  const { email, password } = payload;
  const { success, data, error } = yield* makeRequest.post('/login', { email, password });
  const token = get(data, 'token');
  const user = get(data, 'user');
  if (success && token) {
    yield put(actions.setAuthToken(token));
    yield put(actions.setUser(user));
    yield put(actions.loginSuccess(user));
    yield put(actions.addUser(user));
    yield put(actions.getNotifications());
  } else {
    console.log(error);
    yield put(actions.loginFailure(error))
    return getErrorActions({ error });
  }
  return null;
}

export default login;
