import { put } from 'redux-saga/effects';
import get from 'lodash/get';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* register({ payload }) {
  const { first_name, last_name, email, password } = payload;
  const { success, data, error } = yield* makeRequest.post('/register', { first_name, last_name, email, password });
  if (success && data) {
    yield put(actions.registerSuccess());
  } else {
    yield put(actions.registerFailure());
    return getErrorActions({ error });
  }
  return null;
}

export default register;
