import { all } from 'redux-saga/effects';

import watchAuth from './auth.js';
import watchPosts from './posts.js';
import watchComments from './comments.js'
import watchReplies from './replies.js'
import watchReacts from './reacts.js'


export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPosts(),
    watchComments(),
    watchReplies(),
    watchReacts(),
  ]);
}
