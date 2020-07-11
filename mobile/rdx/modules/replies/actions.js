import types from '../../modules/replies/types';
import createAction from '../../utils/createAction';

export default {
  getReplies: payload => createAction(types.GET_REPLIES_REQUEST, payload),
  getRepliesSuccess: payload => createAction(types.GET_REPLIES_SUCCESS, payload),
  getRepliesFailure: payload => createAction(types.GET_REPLIES_FAILURE, payload),
  setReplies: payload => createAction(types.SET_REPLIES, payload),

  getAllReplies: payload => createAction(types.GET_ALL_REPLIES_REQUEST, payload),
  getAllRepliesSuccess: payload => createAction(types.GET_ALL_REPLIES_SUCCESS, payload),
  getAllRepliesFailure: payload => createAction(types.GET_ALL_REPLIES_FAILURE, payload),

  postReply: payload => createAction(types.POST_REPLY_REQUEST, payload),
  postReplySuccess: payload => createAction(types.POST_REPLY_SUCCESS, payload),
  postReplyFailure: payload => createAction(types.POST_REPLY_FAILURE, payload),
  addReply: payload => createAction(types.ADD_REPLY, payload),

  getReplyComment: payload => createAction(types.GET_REPLY_COMMENT_REQUEST, payload),
  getReplyCommentSuccess: payload => createAction(types.GET_REPLY_COMMENT_SUCCESS, payload),
  getReplyCommentFailure: payload => createAction(types.GET_REPLY_COMMENT_FAILURE, payload),

  deleteReply: payload => createAction(types.DELETE_REPLY_REQUEST, payload),
  deleteReplySuccess: payload => createAction(types.DELETE_REPLY_SUCCESS, payload),
  deleteReplyFailure: payload => createAction(types.DELETE_REPLY_FAILURE, payload),
};
