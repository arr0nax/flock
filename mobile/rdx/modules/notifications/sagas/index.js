import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/notifications/types';
import getNotifications from 'mobile/rdx/modules/notifications/sagas/getNotifications';

function* watchNotificationsSagas() {
  yield trackRequests(takeEvery, types.GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export default watchNotificationsSagas;
