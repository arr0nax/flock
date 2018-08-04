import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_POST_REQUEST,
  POST_POST_SUCCESS,
  POST_POST_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';

const executePostPost = (payload) => {
  const root = 'http://localhost:3000/api/posts'
  return Api.post(root, payload.payload).then((val) => {
    return val;
  });
};

function* postPost(payload, action) {
  try {
    const post = yield call(executePostPost, payload);
    if (post.error) {
      yield put({type: POST_POST_FAILURE, payload: post.error});
    } else {
      yield put({type: POST_POST_SUCCESS, payload: post});
      yield put({type: GET_POSTS_REQUEST})
    }
  } catch (error) {
    yield put({type: POST_POST_FAILURE, payload: error});
    console.warn(error);
  }
}

const executeGetPosts = (payload) => {
  const root = 'http://localhost:3000/api/posts'
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getPosts(payload, action) {
  try {
    const posts = yield call(executeGetPosts, payload);
    if (posts.error) {
      yield put({type: GET_POSTS_FAILURE, payload: posts.error});
    } else {
      yield put({type: GET_POSTS_SUCCESS, payload: posts});
    }
  } catch (error) {
    yield put({type: GET_POSTS_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_POST_REQUEST, postPost);
  yield takeLatest(GET_POSTS_REQUEST, getPosts);
}
