import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../announcements/types';
import getAnnouncements from '../../announcements/sagas/getAnnouncements';
import postAnnouncementSeen from '../../announcements/sagas/postAnnouncementSeen';
import postAnnouncement from '../../announcements/sagas/postAnnouncement';

function* watchAnnouncementsSagas() {
  yield trackRequests(takeEvery, types.GET_ANNOUNCEMENTS_REQUEST, getAnnouncements);
  yield trackRequests(takeEvery, types.POST_ANNOUNCEMENT_SEEN_REQUEST, postAnnouncementSeen);
  yield trackRequests(takeEvery, types.POST_ANNOUNCEMENT_REQUEST, postAnnouncement);
}

export default watchAnnouncementsSagas;
