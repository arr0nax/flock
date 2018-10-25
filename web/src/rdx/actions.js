import authActions from 'rdx/modules/auth/actions';
import postsActions from 'rdx/modules/posts/actions';
import activerequestsActions from 'rdx/modules/activeRequests/actions';
import commentsActions from 'rdx/modules/comments/actions';
import repliesActions from 'rdx/modules/replies/actions';
import reactsActions from 'rdx/modules/reacts/actions';
// IMPORT_PT (for script -- do not remove!)

const actions = {
  ...authActions,
  ...postsActions,
  ...activerequestsActions,
  ...commentsActions,
  ...repliesActions,
  ...reactsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
