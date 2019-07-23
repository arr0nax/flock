import posts from 'rdx/modules/sockets/posts.js';
import comments from 'rdx/modules/sockets/comments.js';
import replies from 'rdx/modules/sockets/replies.js';
import reacts from 'rdx/modules/sockets/reacts.js';
import attachments from 'rdx/modules/sockets/attachments.js';
import notifications from 'rdx/modules/sockets/notifications.js';

const sockets = {
  ...posts,
  ...comments,
  ...replies,
  ...reacts,
  ...attachments,
  ...notifications,

};

export default sockets;
