import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* getTopic(action) {
  const { success, data, error } = yield* makeRequest.get(`/topics/${action.payload}`);
  if (success && data) {
    yield put(actions.getTopicSuccess(data));
    yield put(actions.getUser(data.user_id));
  } else {
    yield put(actions.getTopicFailure({ error }));
  }
  return null;
}

export default getTopic;
