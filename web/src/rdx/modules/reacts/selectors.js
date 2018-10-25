import { get } from 'lodash';

export default {
  getPostReacts: state => state['post_reacts'],
  getCommentReacts: state => state['comment_reacts'],
  getReplyReacts: state => state['reply_reacts'],
};
