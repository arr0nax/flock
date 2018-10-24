import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_ATTACHMENT_REQUEST,
  POST_ATTACHMENT_SUCCESS,
  POST_ATTACHMENT_FAILURE,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api'; import { API_ENDPOINT } from '../lib/constants/api';

const executePostAttachment = (payload) => {
  const root = API_ENDPOINT+'/attachments'
  return Api.post(root, payload.payload).then((val) => {
    return val;
  });
};

function* postAttachment(payload, action) {
  try {
    const post = yield call(executePostPost, payload);
    if (post.error) {
      yield put({type: POST_ATTACHMENT_FAILURE, payload: post.error});
    } else {
      yield put({type: POST_ATTACHMENT_SUCCESS, payload: post});
    }
  } catch (error) {
    yield put({type: POST_ATTACHMENT_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAttachments() {
  yield takeLatest(POST_ATTACHMENT_REQUEST, postPost);
}
