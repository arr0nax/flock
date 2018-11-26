import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* postPosts(action) {
  const { success, data, error } = yield* makeRequest.post(`/posts`, {
    ...action.payload
  });
  if (success && data) {
    yield put(actions.addPost(data));
    // yield all(data.map(post => {
    //   return put(actions.getComments(post.id))
    // }))
    // yield all(posts.map(post => {
    //   return put({type: GET_USER_REQUEST, payload: post.user_id})
    // }))
    // yield all(data.map(post => {
    //   return put(actions.getReacts({item_id: post.id, type: 'posts'}))
    // }))
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postPosts;