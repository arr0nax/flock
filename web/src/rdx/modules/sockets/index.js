import posts from 'rdx/modules/sockets/posts.js';
import comments from 'rdx/modules/sockets/comments.js';
import replies from 'rdx/modules/sockets/replies.js';
import reacts from 'rdx/modules/sockets/reacts.js';

const sockets = {
  ...posts,
  ...comments,
  ...replies,
  ...reacts,

};

export default sockets;
