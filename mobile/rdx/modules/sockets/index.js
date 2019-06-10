import posts from 'mobile/rdx/modules/sockets/posts.js';
import comments from 'mobile/rdx/modules/sockets/comments.js';
import replies from 'mobile/rdx/modules/sockets/replies.js';
import reacts from 'mobile/rdx/modules/sockets/reacts.js';

const sockets = {
  ...posts,
  ...comments,
  ...replies,
  ...reacts,

};

export default sockets;
