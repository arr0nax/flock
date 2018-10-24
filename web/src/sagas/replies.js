import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_REPLY_REQUEST,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAILURE,
  GET_REPLIES_REQUEST,
  GET_REPLIES_SUCCESS,
  GET_REPLIES_FAILURE,
  GET_REACTS_REQUEST,
  GET_USER_REQUEST,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api'; import { API_ENDPOINT } from '../lib/constants/api';

const executePostReply = (payload) => {
  const root = `${API_ENDPOINT}/comments/${payload.payload.comment_id}/replies`
  return Api.post(root, {
      text: payload.payload.text
    }).then((val) => {
      return val;
  });
};

function* postReply(payload, action) {
  try {
    const post = yield call(executePostReply, payload);
    if (post.error) {
      yield put({type: POST_REPLY_FAILURE, payload: post.error});
    } else {
      yield put({type: POST_REPLY_SUCCESS, payload: post});
    }
  } catch (error) {
    yield put({type: POST_REPLY_FAILURE, payload: error});
    console.warn(error);
  }
}

const executeGetReplies = (payload) => {
  const root = `${API_ENDPOINT}/comments/${payload.payload.comment_id}/replies`
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getReplies(payload, action) {
  try {
    const replies = yield call(executeGetReplies, payload);
    if (replies.error) {
      yield put({type: GET_REPLIES_FAILURE, payload: replies.error});
    } else {
      yield put({type: GET_REPLIES_SUCCESS, payload: {replies: replies, post_id: payload.payload.post_id, comment_id: payload.payload.comment_id}});
      yield all(replies.map(reply => {
        return put({type: GET_REACTS_REQUEST, payload: {item_id: reply.id, type: 'replies'}})
      }))
      yield all(replies.map(reply => {
        return put({type: GET_USER_REQUEST, payload: reply.user_id})
      }))
    }
  } catch (error) {
    yield put({type: GET_REPLIES_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_REPLY_REQUEST, postReply);
  yield takeEvery(GET_REPLIES_REQUEST, getReplies);
}
