import authActions from './modules/auth/actions';
import postsActions from './modules/posts/actions';
import activerequestsActions from './modules/activeRequests/actions';
import commentsActions from './modules/comments/actions';
import repliesActions from './modules/replies/actions';
import reactsActions from './modules/reacts/actions';
import usersActions from './modules/users/actions';
import notificationsActions from './modules/notifications/actions';
import attachmentsActions from './modules/attachments/actions';
// IMPORT_PT (for script -- do not remove!)

const actions = {
  ...authActions,
  ...postsActions,
  ...activerequestsActions,
  ...commentsActions,
  ...repliesActions,
  ...reactsActions,
  ...usersActions,
  ...notificationsActions,
  ...attachmentsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
