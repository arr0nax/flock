import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_REPLIES_REQUEST,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';

const executePostComment = (payload) => {
  const root = `http://localhost:3000/api/posts/${payload.payload.postId}/comments`
  return Api.post(root, {
      text: payload.payload.content
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
  const root = `http://localhost:3000/api/posts/${payload.payload.postId}/comments`
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
      yield put({type: GET_COMMENTS_SUCCESS, payload: {comments: comments, postId: payload.payload.postId}});
      yield all(comments.map(comment => {
        return put({type: GET_REPLIES_REQUEST, payload: {postId: payload.payload.postId, commentId: comment._id}})
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
