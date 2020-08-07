import { put } from 'redux-saga/effects';
import get from 'lodash/get';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* register({ payload }) {
  const { first_name, last_name, email, password, group_code } = payload;
  const { success, data, error } = yield* makeRequest.post('/register', { first_name, last_name, email, password, group_code });
  if (success && data) {
    yield put(actions.registerSuccess());
    yield put(actions.requestLogin({email, password}))
  } else {
    yield put(actions.registerFailure());
    return getErrorActions({ error });
  }
  return null;
}

export default register;
