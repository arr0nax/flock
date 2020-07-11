import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../topic/types';
import getTopic from '../../topic/sagas/getTopic';
import postTopic from '../../topic/sagas/postTopic';

function* watchTopicSagas() {
  yield trackRequests(takeEvery, types.GET_TOPIC_REQUEST, getTopic);
  yield trackRequests(takeEvery, types.POST_TOPIC_REQUEST, postTopic);
}

export default watchTopicSagas;
