import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
