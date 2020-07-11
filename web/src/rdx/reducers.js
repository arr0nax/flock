import { combineReducers } from 'redux';
import authReducers from 'rdx/modules/auth/reducers';
import postsReducers from 'rdx/modules/posts/reducers';
import activerequestsReducers from 'rdx/modules/activeRequests/reducers';
import commentsReducers from 'rdx/modules/comments/reducers';
import repliesReducers from 'rdx/modules/replies/reducers';
import reactsReducers from 'rdx/modules/reacts/reducers';
import usersReducers from 'rdx/modules/users/reducers';
import notificationsReducers from 'rdx/modules/notifications/reducers';
import attachmentsReducers from 'rdx/modules/attachments/reducers';
import reportsReducers from 'rdx/modules/reports/reducers';
import reportvotesReducers from 'rdx/modules/reportVotes/reducers';
import announcementsReducers from 'rdx/modules/announcements/reducers';
import groupReducers from 'rdx/modules/group/reducers';
import topicReducers from 'rdx/modules/topic/reducers';
import metaReducers from 'rdx/modules/meta/reducers';
// IMPORT_PT (for script -- do not remove!)

export const reducers = {
  ...authReducers,
  ...postsReducers,
  ...activerequestsReducers,
  ...commentsReducers,
  ...repliesReducers,
  ...reactsReducers,
  ...usersReducers,
  ...notificationsReducers,
  ...attachmentsReducers,
  ...reportsReducers,
  ...reportvotesReducers,
  ...announcementsReducers,
  ...groupReducers,
  ...topicReducers,
  ...metaReducers,
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers() {
  return combineReducers(reducers);
}
