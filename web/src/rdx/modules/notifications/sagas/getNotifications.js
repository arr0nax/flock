import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getNotifications(action) {
  const { success, data, error } = yield* makeRequest.get(`/notifications`);
  if (success && data) {
    yield put(actions.getNotificationsSuccess(data));
  } else {
    yield put(actions.getNotificationsFailure({ error }));
  }
  return null;
}

export default getNotifications;
