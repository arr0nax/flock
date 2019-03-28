import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getNotifications(action) {
  const { success, data, error } = yield* makeRequest.get(`/notifications`);
  if (success && data) {
    yield put(actions.getNotificationsSuccess(data));
    yield put(actions.setNotifications(data));
  } else {
    return actions.getNotificationsFailure({ error });
  }
  return actions.getNotificationsFailure({ error });
}

export default getNotifications;
