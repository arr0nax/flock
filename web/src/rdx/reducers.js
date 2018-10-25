import { combineReducers } from 'redux';
import authReducers from 'rdx/modules/auth/reducers';
import postsReducers from 'rdx/modules/posts/reducers';
import activerequestsReducers from 'rdx/modules/activeRequests/reducers';
import commentsReducers from 'rdx/modules/comments/reducers';
import repliesReducers from 'rdx/modules/replies/reducers';
import reactsReducers from 'rdx/modules/reacts/reducers';
// IMPORT_PT (for script -- do not remove!)

export const reducers = {
  ...authReducers,
  ...postsReducers,
  ...activerequestsReducers,
  ...commentsReducers,
  ...repliesReducers,
  ...reactsReducers,
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers() {
  return combineReducers(reducers);
}
