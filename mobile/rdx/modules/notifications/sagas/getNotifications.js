import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getNotifications(action) {
  const { success, data, error } = yield* makeRequest.get(`/notifications`);
  if (success && data) {
    yield put(actions.setNotifications(data));
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getNotifications;