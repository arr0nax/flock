import posts from '../sockets/posts.js';
import comments from '../sockets/comments.js';
import replies from '../sockets/replies.js';
import reacts from '../sockets/reacts.js';

const sockets = {
  ...posts,
  ...comments,
  ...replies,
  ...reacts,

};

export default sockets;
