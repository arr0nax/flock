import { all } from 'redux-saga/effects';

import watchAuthSagas from './modules/auth/sagas';
import watchPostsSagas from './modules/posts/sagas';
import watchCommentsSagas from './modules/comments/sagas';
import watchRepliesSagas from './modules/replies/sagas';
import watchReactsSagas from './modules/reacts/sagas';
import watchUsersSagas from './modules/users/sagas';
import watchNotificationsSagas from './modules/notifications/sagas';
import watchAttachmentsSagas from './modules/attachments/sagas';
// IMPORT_PT (for script -- do not remove!)

function* rootSaga() {
  yield all([
    watchAuthSagas(),
    watchPostsSagas(),
    watchCommentsSagas(),
    watchRepliesSagas(),
    watchReactsSagas(),
    watchUsersSagas(),
    watchNotificationsSagas(),
    watchAttachmentsSagas(),
    // INSERTION_PT (for script -- do not remove!)
  ]);
}

export default rootSaga;
