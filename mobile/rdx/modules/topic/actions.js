import types from '../../modules/topic/types';
import createAction from '../../utils/createAction';

export default {
  getTopic: payload => createAction(types.GET_TOPIC_REQUEST, payload),
  getTopicSuccess: payload => createAction(types.GET_TOPIC_SUCCESS, payload),
  getTopicFailure: payload => createAction(types.GET_TOPIC_FAILURE, payload),
  postTopic: payload => createAction(types.POST_TOPIC_REQUEST, payload),
  postTopicSuccess: payload => createAction(types.POST_TOPIC_SUCCESS, payload),
  postTopicFailure: payload => createAction(types.POST_TOPIC_FAILURE, payload),
};
