import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getUserGroup(action) {
  const { success, data, error } = yield* makeRequest.get(`/groups/${action.payload}`);
  if (success && data) {
    yield put(actions.getUserGroupSuccess(data));
    yield put(actions.getTopic(data.topic_id))
  } else {
    yield put(actions.getUserGroupFailure({ error }));
  }
  return null;
}

export default getUserGroup;
