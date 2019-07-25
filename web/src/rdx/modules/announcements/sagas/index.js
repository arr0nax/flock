import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/announcements/types';
import getAnnouncements from 'rdx/modules/announcements/sagas/getAnnouncements';
import postAnnouncementSeen from 'rdx/modules/announcements/sagas/postAnnouncementSeen';

function* watchAnnouncementsSagas() {
  yield trackRequests(takeEvery, types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncements);
  yield trackRequests(takeEvery, types.POST_ANNOUNCEMENT_SEEN_REQUEST, postAnnouncementSeen);
}

export default watchAnnouncementsSagas;
