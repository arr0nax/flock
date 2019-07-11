import { combineReducers } from 'redux';
import authReducers from './modules/auth/reducers';
import postsReducers from './modules/posts/reducers';
import activerequestsReducers from './modules/activeRequests/reducers';
import commentsReducers from './modules/comments/reducers';
import repliesReducers from './modules/replies/reducers';
import reactsReducers from './modules/reacts/reducers';
import usersReducers from './modules/users/reducers';
import notificationsReducers from './modules/notifications/reducers';
import attachmentsReducers from './modules/attachments/reducers';
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
