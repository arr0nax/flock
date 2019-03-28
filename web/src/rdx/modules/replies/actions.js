import types from 'rdx/modules/replies/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReplies: payload => createAction(types.GET_REPLIES_REQUEST, payload),
  getRepliesSuccess: payload => createAction(types.GET_REPLIES_SUCCESS, payload),
  getRepliesFailure: payload => createAction(types.GET_REPLIES_FAILURE, payload),
  setReplies: payload => createAction(types.SET_REPLIES, payload),

  postReply: payload => createAction(types.POST_REPLY_REQUEST, payload),
  postReplySuccess: payload => createAction(types.POST_REPLY_SUCCESS, payload),
  postReplyFailure: payload => createAction(types.POST_REPLY_FAILURE, payload),
  addReply: payload => createAction(types.ADD_REPLY, payload),
};
