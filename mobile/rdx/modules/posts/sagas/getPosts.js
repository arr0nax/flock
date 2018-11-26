import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* getPosts(action) {
  const { success, data, error } = yield* makeRequest.get(`/posts`);
  if (success && data) {
    yield put(actions.setPosts(data));
    yield all(data.map(post => {
      return put(actions.getComments(post.id))
    }))
    yield all(data.map(post => {
      return put(actions.getUser(post.user_id))
    }))
    yield all(data.map(post => {
      return put(actions.getReacts({item_id: post.id, type: 'posts'}))
    }))
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default getPosts;
