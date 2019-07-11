import authTypes from './modules/auth/types';
import postsTypes from './modules/posts/types';
import activerequestsTypes from './modules/activeRequests/types';
import commentsTypes from './modules/comments/types';
import repliesTypes from './modules/replies/types';
import reactsTypes from './modules/reacts/types';
import usersTypes from './modules/users/types';
import notificationsTypes from './modules/notifications/types';
import attachmentsTypes from './modules/attachments/types';
// IMPORT_PT (for script -- do not remove!)

const types = {
  ...authTypes,
  ...postsTypes,
  ...activerequestsTypes,
  ...commentsTypes,
  ...repliesTypes,
  ...reactsTypes,
  ...usersTypes,
  ...notificationsTypes,
  ...attachmentsTypes,
// INSERTION_PT (for script -- do not remove!)
};

export default types;
