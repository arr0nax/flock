import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getNotifications from './getNotifications';

function* watchNotificationsSagas() {
  yield trackRequests(takeEvery, types.GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export default watchNotificationsSagas;
