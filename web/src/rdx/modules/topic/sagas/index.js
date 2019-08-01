import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/topic/types';
import getTopic from 'rdx/modules/topic/sagas/getTopic';
import postTopic from 'rdx/modules/topic/sagas/postTopic';

function* watchTopicSagas() {
  yield trackRequests(takeEvery, types.GET_TOPIC_REQUEST, getTopic);
  yield trackRequests(takeEvery, types.POST_TOPIC_REQUEST, postTopic);
}

export default watchTopicSagas;
