import authTypes from 'rdx/modules/auth/types';
import postsTypes from 'rdx/modules/posts/types';
import activerequestsTypes from 'rdx/modules/activeRequests/types';
import commentsTypes from 'rdx/modules/comments/types';
import repliesTypes from 'rdx/modules/replies/types';
import reactsTypes from 'rdx/modules/reacts/types';
import usersTypes from 'rdx/modules/users/types';
import notificationsTypes from 'rdx/modules/notifications/types';
import attachmentsTypes from 'rdx/modules/attachments/types';
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