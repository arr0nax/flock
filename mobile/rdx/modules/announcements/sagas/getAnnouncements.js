import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* getAnnouncements(action) {
  const { success, data, error } = yield* makeRequest.get(`/announcements`);
  if (success && data) {
    yield put(actions.getAnnouncementsSuccess(data));
  } else {
    yield put(actions.getAnnouncementsFailure({ error }));
  }
  return null;
}

export default getAnnouncements;
