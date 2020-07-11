import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
