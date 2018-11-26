import { all } from 'redux-saga/effects';

import watchAuthSagas from 'mobile/rdx/modules/auth/sagas';
import watchPostsSagas from 'mobile/rdx/modules/posts/sagas';
import watchCommentsSagas from 'mobile/rdx/modules/comments/sagas';
import watchRepliesSagas from 'mobile/rdx/modules/replies/sagas';
import watchReactsSagas from 'mobile/rdx/modules/reacts/sagas';
import watchUsersSagas from 'mobile/rdx/modules/users/sagas';
import watchNotificationsSagas from 'mobile/rdx/modules/notifications/sagas';
import watchAttachmentsSagas from 'mobile/rdx/modules/attachments/sagas';
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
