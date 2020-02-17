import types from 'rdx/modules/attachments/types';
import createAction from 'rdx/utils/createAction';

export default {
  getAttachments: payload => createAction(types.GET_ATTACHMENTS_REQUEST, payload),
  getAttachmentsSuccess: payload => createAction(types.GET_ATTACHMENTS_SUCCESS, payload),
  getAttachmentsFailure: payload => createAction(types.GET_ATTACHMENTS_FAILURE, payload),
  postAttachment: payload => createAction(types.POST_ATTACHMENT_REQUEST, payload),
  postCommentAttachmentSuccess: payload => createAction(types.POST_COMMENT_ATTACHMENT_SUCCESS, payload),
  postCommentAttachmentFailure: payload => createAction(types.POST_COMMENT_ATTACHMENT_FAILURE, payload),
  postPostAttachmentSuccess: payload => createAction(types.POST_POST_ATTACHMENT_SUCCESS, payload),
  postPostAttachmentFailure: payload => createAction(types.POST_POST_ATTACHMENT_FAILURE, payload),
  postReplyAttachmentSuccess: payload => createAction(types.POST_REPLY_ATTACHMENT_SUCCESS, payload),
  postReplyAttachmentFailure: payload => createAction(types.POST_REPLY_ATTACHMENT_FAILURE, payload),
  setPostAttachments: payload => createAction(types.SET_POST_ATTACHMENTS, payload),
  setCommentAttachments: payload => createAction(types.SET_COMMENT_ATTACHMENTS, payload),
  setReplyAttachments: payload => createAction(types.SET_REPLY_ATTACHMENTS, payload),
  initSetPostAttachments: payload => createAction(types.INIT_SET_POST_ATTACHMENTS, payload),
  initSetCommentAttachments: payload => createAction(types.INIT_SET_COMMENT_ATTACHMENTS, payload),
  initSetReplyAttachments: payload => createAction(types.INIT_SET_REPLY_ATTACHMENTS, payload),
  addPostAttachment: payload => createAction(types.ADD_POST_ATTACHMENT, payload),
  addCommentAttachment: payload => createAction(types.ADD_COMMENT_ATTACHMENT, payload),
  addReplyAttachment: payload => createAction(types.ADD_REPLY_ATTACHMENT, payload),
};
