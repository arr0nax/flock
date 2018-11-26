import authTypes from 'mobile/rdx/modules/auth/types';
import postsTypes from 'mobile/rdx/modules/posts/types';
import activerequestsTypes from 'mobile/rdx/modules/activeRequests/types';
import commentsTypes from 'mobile/rdx/modules/comments/types';
import repliesTypes from 'mobile/rdx/modules/replies/types';
import reactsTypes from 'mobile/rdx/modules/reacts/types';
import usersTypes from 'mobile/rdx/modules/users/types';
import notificationsTypes from 'mobile/rdx/modules/notifications/types';
import attachmentsTypes from 'mobile/rdx/modules/attachments/types';
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
