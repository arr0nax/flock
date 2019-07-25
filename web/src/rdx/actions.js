import authActions from 'rdx/modules/auth/actions';
import postsActions from 'rdx/modules/posts/actions';
import activerequestsActions from 'rdx/modules/activeRequests/actions';
import commentsActions from 'rdx/modules/comments/actions';
import repliesActions from 'rdx/modules/replies/actions';
import reactsActions from 'rdx/modules/reacts/actions';
import usersActions from 'rdx/modules/users/actions';
import notificationsActions from 'rdx/modules/notifications/actions';
import attachmentsActions from 'rdx/modules/attachments/actions';
import reportsActions from 'rdx/modules/reports/actions';
import routerActions from 'rdx/modules/router/actions';
import reportvotesActions from 'rdx/modules/reportVotes/actions';
import announcementsActions from 'rdx/modules/announcements/actions';
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
  ...reportsActions,
  ...routerActions,
  ...reportvotesActions,
  ...announcementsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
