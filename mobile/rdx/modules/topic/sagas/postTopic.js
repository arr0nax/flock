import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
