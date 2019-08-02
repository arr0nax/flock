import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getTopic(action) {
  const { success, data, error } = yield* makeRequest.post(`/topics`, {
    text: action.payload
  });
  if (success && data) {
    yield put(actions.postTopicSuccess(data.topic));
    yield put(actions.getUserGroupSuccess(data.group));
  } else {
    yield put(actions.postTopicFailure({ error }));
  }
  return null;
}

export default getTopic;
