import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import constructQueryParams from '../../../utils/constructQueryParams';
import actions from '../../../actions';

function* getMorePosts(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts${constructQueryParams(action.payload)}`);
  if (success && data) {
    const posts = data.posts;
    const pagination = data.pagination;
    yield put(actions.getMorePostsSuccess(data));
    yield all(posts.map(post => {
      return put(actions.getComments(post.id))
    }))
    yield all(posts.map(post => {
      return put(actions.getUser(post.user_id))
    }))
    yield all(posts.map(post => {
      return put(actions.getReacts({item_id: post.id, type: 'posts'}))
    }))
  } else {
    yield put(actions.getMorePostsFailure({ error }));
  }
  return null;
}

export default getMorePosts;
