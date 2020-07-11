import posts from '../../modules/sockets/posts.js';
import comments from '../../modules/sockets/comments.js';
import replies from '../../modules/sockets/replies.js';
import reacts from '../../modules/sockets/reacts.js';
import attachments from '../../modules/sockets/attachments.js';
import notifications from '../../modules/sockets/notifications.js';

const sockets = {
  ...posts,
  ...comments,
  ...replies,
  ...reacts,
  ...attachments,
  ...notifications,

};

export default sockets;
