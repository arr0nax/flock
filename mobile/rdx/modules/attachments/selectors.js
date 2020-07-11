import get from 'lodash/get';

export default {
  getPostAttachments: state => get(state, 'post_attachments.data'),
  getCommentAttachments: state => get(state, 'comment_attachments.data'),
  getReplyAttachments: state => get(state, 'reply_attachments.data'),
  getPostAttachmentsRequested: state => get(state, 'post_attachments.requested'),
  getCommentAttachmentsRequested: state => get(state, 'comment_attachments.requested'),
  getReplyAttachmentsRequested: state => get(state, 'reply_attachments.requested'),
};
