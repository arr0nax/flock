import authSelectors from './modules/auth/selectors';
import postsSelectors from './modules/posts/selectors';
import activerequestsSelectors from './modules/activeRequests/selectors';
import commentsSelectors from './modules/comments/selectors';
import repliesSelectors from './modules/replies/selectors';
import reactsSelectors from './modules/reacts/selectors';
import usersSelectors from './modules/users/selectors';
import notificationsSelectors from './modules/notifications/selectors';
import attachmentsSelectors from './modules/attachments/selectors';
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
