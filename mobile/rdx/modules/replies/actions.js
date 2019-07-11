import types from '../replies/types';
import createAction from '../../utils/createAction';

export default {
  getReplies: payload => createAction(types.GET_REPLIES_REQUEST, payload),
  getRepliesSuccess: payload => createAction(types.GET_REPLIES_SUCCESS, payload),
  getRepliesFailure: payload => createAction(types.GET_REPLIES_FAILURE, payload),
  setReplies: payload => createAction(types.SET_REPLIES, payload),

  postReply: payload => createAction(types.POST_REPLY_REQUEST, payload),
  postReplySuccess: payload => createAction(types.POST_REPLY_SUCCESS, payload),
  postReplyFailure: payload => createAction(types.POST_REPLY_FAILURE, payload),
  addReply: payload => createAction(types.ADD_REPLY, payload),

  getReplyComment: payload => createAction(types.GET_REPLY_COMMENT_REQUEST, payload),
  getReplyCommentSuccess: payload => createAction(types.GET_REPLY_COMMENT_SUCCESS, payload),
  getReplyCommentFailure: payload => createAction(types.GET_REPLY_COMMENT_FAILURE, payload),
};
