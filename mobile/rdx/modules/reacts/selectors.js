import get from 'lodash/get';

export default {
  getPostReacts: state => get(state, 'post_reacts.data'),
  getCommentReacts: state => get(state, 'comment_reacts.data'),
  getReplyReacts: state => get(state, 'reply_reacts.data'),
  getPostReactsRequested: state => get(state, 'post_reacts.requested'),
  getCommentReactsRequested: state => get(state, 'comment_reacts.requested'),
  getReplyReactsRequested: state => get(state, 'reply_reacts.requested'),
};
