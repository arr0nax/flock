import get from 'lodash/get';

export default {
  getReplies: state => get(state, 'replies.data'),
  getRepliesRequested: state => get(state, 'replies.requested'),
};
