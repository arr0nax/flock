import { all } from 'redux-saga/effects';

import watchAuth from './auth.js';
import watchPosts from './posts.js';


export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPosts(),
  ]);
}
