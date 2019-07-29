import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/announcements/types';
import getAnnouncements from 'rdx/modules/announcements/sagas/getAnnouncements';
import postAnnouncementSeen from 'rdx/modules/announcements/sagas/postAnnouncementSeen';
import postAnnouncement from 'rdx/modules/announcements/sagas/postAnnouncement';

function* watchAnnouncementsSagas() {
  yield trackRequests(takeEvery, types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncements);
  yield trackRequests(takeEvery, types.POST_ANNOUNCEMENT_SEEN_REQUEST, postAnnouncementSeen);
  yield trackRequests(takeEvery, types.POST_ANNOUNCEMENT_REQUEST, postAnnouncement);
}

export default watchAnnouncementsSagas;
