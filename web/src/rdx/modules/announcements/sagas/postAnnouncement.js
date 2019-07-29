import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postAnnouncement(action) {
  const { success, data, error } = yield* makeRequest.post(`/announcements`, {text: action.payload});
  if (success && data) {
    yield put(actions.postAnnouncementSuccess(data));
    yield put(actions.getAnnouncements());
  } else {
    yield put(actions.postAnnouncementFailure({ error }));
  }
  return null;
}

export default postAnnouncement;
