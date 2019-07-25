import { all } from 'redux-saga/effects';

import watchAuthSagas from 'rdx/modules/auth/sagas';
import watchPostsSagas from 'rdx/modules/posts/sagas';
import watchCommentsSagas from 'rdx/modules/comments/sagas';
import watchRepliesSagas from 'rdx/modules/replies/sagas';
import watchReactsSagas from 'rdx/modules/reacts/sagas';
import watchUsersSagas from 'rdx/modules/users/sagas';
import watchNotificationsSagas from 'rdx/modules/notifications/sagas';
import watchAttachmentsSagas from 'rdx/modules/attachments/sagas';
import watchReportsSagas from 'rdx/modules/reports/sagas';
import watchReportvotesSagas from 'rdx/modules/reportVotes/sagas';
import watchAnnouncementsSagas from 'rdx/modules/announcements/sagas';
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
    watchReportsSagas(),
    watchReportvotesSagas(),
    watchAnnouncementsSagas(),
    // INSERTION_PT (for script -- do not remove!)
  ]);
}

export default rootSaga;
