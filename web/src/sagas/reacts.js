import { call, put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  POST_REACT_REQUEST,
  POST_REACT_SUCCESS,
  POST_REACT_FAILURE,
  GET_REACTS_REQUEST,
  GET_REACTS_SUCCESS,
  GET_REACTS_FAILURE,
  GET_REPLIES_REQUEST,
} from '../lib/constants/actions';
import Api from '../lib/utils/Api';

const executePostReact = (payload) => {
  const root = `http://localhost:3000/api/posts/${payload.payload.postId}/reacts`
  return Api.post(root, {
      react: payload.payload.react
    }).then((val) => {
      return val;
  });
};

function* postReact(payload, action) {
  try {
    const react = yield call(executePostReact, payload);
    if (react.error) {
      yield put({type: POST_REACT_FAILURE, payload: react.error});
    } else {
      yield put({type: POST_REACT_SUCCESS, payload: react});
    }
  } catch (error) {
    yield put({type: POST_REACT_FAILURE, payload: error});
    console.warn(error);
  }
}

const executeGetReacts = (payload) => {
  const root = `http://localhost:3000/api/posts/${payload.payload.postId}/reacts`
  return Api.get(root).then((val) => {
    return val;
  });
};

function* getReacts(payload, action) {
  try {
    const reacts = yield call(executeGetReacts, payload);
    if (reacts.error) {
      yield put({type: GET_REACTS_FAILURE, payload: reacts.error});
    } else {
      yield all(reacts.map(react => {
        return put({type: GET_REACTS_SUCCESS, payload: react})
      }))
    }
  } catch (error) {
    yield put({type: GET_REACTS_FAILURE, payload: error});
    console.warn(error);
  }
}

export default function* watchAuth() {
  yield takeLatest(POST_REACT_REQUEST, postReact);
  yield takeEvery(GET_REACTS_REQUEST, getReacts);
}
