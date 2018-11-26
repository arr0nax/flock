import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/notifications/types';
import getNotifications from 'rdx/modules/notifications/sagas/getNotifications';

function* watchNotificationsSagas() {
  yield trackRequests(takeEvery, types.GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export default watchNotificationsSagas;
