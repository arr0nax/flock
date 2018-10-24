import { all } from 'redux-saga/effects';

import watchAuth from './auth.js';
import watchPosts from './posts.js';
import watchComments from './comments.js'
import watchReplies from './replies.js'
import watchReacts from './reacts.js'
import watchUsers from './users.js'
import watchNotifs from './notifications.js'


export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPosts(),
    watchComments(),
    watchReplies(),
    watchReacts(),
    watchUsers(),
    watchNotifs(),
  ]);
}
