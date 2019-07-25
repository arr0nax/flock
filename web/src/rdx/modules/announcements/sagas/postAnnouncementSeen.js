import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postAnnouncementSeen(action) {
  const { success, data, error } = yield* makeRequest.post(`/announcements/${action.payload}/seen`);
  if (success && data) {
    yield put(actions.postAnnouncementSeenSuccess(data));
    yield put(actions.getAnnouncements());
  } else {
    yield put(actions.postAnnouncementSeenFailure({ error }));
  }
  return null;
}

export default postAnnouncementSeen;
