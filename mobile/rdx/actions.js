import authActions from 'mobile/rdx/modules/auth/actions';
import postsActions from 'mobile/rdx/modules/posts/actions';
import activerequestsActions from 'mobile/rdx/modules/activeRequests/actions';
import commentsActions from 'mobile/rdx/modules/comments/actions';
import repliesActions from 'mobile/rdx/modules/replies/actions';
import reactsActions from 'mobile/rdx/modules/reacts/actions';
import usersActions from 'mobile/rdx/modules/users/actions';
import notificationsActions from 'mobile/rdx/modules/notifications/actions';
import attachmentsActions from 'mobile/rdx/modules/attachments/actions';
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
