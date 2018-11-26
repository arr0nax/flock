import { combineReducers } from 'redux';
import authReducers from 'mobile/rdx/modules/auth/reducers';
import postsReducers from 'mobile/rdx/modules/posts/reducers';
import activerequestsReducers from 'mobile/rdx/modules/activeRequests/reducers';
import commentsReducers from 'mobile/rdx/modules/comments/reducers';
import repliesReducers from 'mobile/rdx/modules/replies/reducers';
import reactsReducers from 'mobile/rdx/modules/reacts/reducers';
import usersReducers from 'mobile/rdx/modules/users/reducers';
import notificationsReducers from 'mobile/rdx/modules/notifications/reducers';
import attachmentsReducers from 'mobile/rdx/modules/attachments/reducers';
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
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers() {
  return combineReducers(reducers);
}
