import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
