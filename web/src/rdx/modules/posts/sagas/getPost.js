import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import constructQueryParams from 'rdx/utils/constructQueryParams';
import actions from 'rdx/actions';

function* getPost(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts/${action.payload}`);
  if (success && data) {
    const posts = data.posts;
    const pagination = data.pagination;
    yield put(actions.getPostSuccess(data));
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
    yield put(actions.getPostFailure({ error }));
  }
  return null;
}

export default getPost;
