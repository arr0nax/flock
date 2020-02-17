import authSelectors from 'rdx/modules/auth/selectors';
import postsSelectors from 'rdx/modules/posts/selectors';
import activerequestsSelectors from 'rdx/modules/activeRequests/selectors';
import commentsSelectors from 'rdx/modules/comments/selectors';
import repliesSelectors from 'rdx/modules/replies/selectors';
import reactsSelectors from 'rdx/modules/reacts/selectors';
import usersSelectors from 'rdx/modules/users/selectors';
import notificationsSelectors from 'rdx/modules/notifications/selectors';
import attachmentsSelectors from 'rdx/modules/attachments/selectors';
import reportsSelectors from 'rdx/modules/reports/selectors';
import routerSelectors from 'rdx/modules/router/selectors';
import reportvotesSelectors from 'rdx/modules/reportVotes/selectors';
import announcementsSelectors from 'rdx/modules/announcements/selectors';
import groupSelectors from 'rdx/modules/group/selectors';
import topicSelectors from 'rdx/modules/topic/selectors';
import metaSelectors from 'rdx/modules/meta/selectors';
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
  ...reportsSelectors,
  ...routerSelectors,
  ...reportvotesSelectors,
  ...announcementsSelectors,
  ...groupSelectors,
  ...topicSelectors,
  ...metaSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
