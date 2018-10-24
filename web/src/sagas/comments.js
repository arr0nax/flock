import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_REPLIES_REQUEST,
  GET_REACTS_REQUEST,
  GET_USER_REQUEST,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';
import { API_ENDPOINT } from '../lib/constants/api';

const executePostComment = (payload) => {
  const root = `${API_ENDPOINT}/posts/${payload.payload.post_id}/comments`
  return Api.post(root, {
      text: payload.payload.text
    }).then((val) => {
      return val;
  });
};

function* postComment(payload, action) {
  try {
    const comment = yield call(executePostComment, payload);
    if (comment.error) {
      yield put({type: POST_COMMENT_FAILURE, payload: comment.error});
    } else {
      yield put({type: POST_COMMENT_SUCCESS, payload: comment});
    }
  } catch (error) {
    yield put({type: POST_COMMENT_FAILURE, payload: error});
    console.warn(error);
  }
}

const executeGetComments = (payload) => {
  const root = `${API_ENDPOINT}/posts/${payload.payload.post_id}/comments`
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getComments(payload, action) {
  try {
    const comments = yield call(executeGetComments, payload);
    if (comments.error) {
      yield put({type: GET_COMMENTS_FAILURE, payload: comments.error});
    } else {
      yield put({type: GET_COMMENTS_SUCCESS, payload: {comments: comments, post_id: payload.payload.post_id}});
      yield all(comments.map(comment => {
        return put({type: GET_REPLIES_REQUEST, payload: {post_id: payload.payload.post_id, comment_id: comment.id}})
      }))
      yield all(comments.map(comment => {
        return put({type: GET_USER_REQUEST, payload: comment.user_id})
      }))
      yield all(comments.map(comment => {
        return put({type: GET_REACTS_REQUEST, payload: {item_id: comment.id, type: "comments"}})
      }))
    }
  } catch (error) {
    yield put({type: GET_COMMENTS_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_COMMENT_REQUEST, postComment);
  yield takeEvery(GET_COMMENTS_REQUEST, getComments);
}
