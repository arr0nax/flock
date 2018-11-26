import authSelectors from 'mobile/rdx/modules/auth/selectors';
import postsSelectors from 'mobile/rdx/modules/posts/selectors';
import activerequestsSelectors from 'mobile/rdx/modules/activeRequests/selectors';
import commentsSelectors from 'mobile/rdx/modules/comments/selectors';
import repliesSelectors from 'mobile/rdx/modules/replies/selectors';
import reactsSelectors from 'mobile/rdx/modules/reacts/selectors';
import usersSelectors from 'mobile/rdx/modules/users/selectors';
import notificationsSelectors from 'mobile/rdx/modules/notifications/selectors';
import attachmentsSelectors from 'mobile/rdx/modules/attachments/selectors';
// IMPORT_PT (for script -- do not remove!)

const selectors = {
  ...authSelectors,
  ...postsSelectors,
  ...activerequestsSelectors,
  ...commentsSelectors,
  ...repliesSelectors,
  ...reactsSelectors,
  ...usersSelectors,
  ...notificationsSelectors,
  ...attachmentsSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
