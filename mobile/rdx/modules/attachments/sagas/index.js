import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/attachments/types';
import postAttachment from 'mobile/rdx/modules/attachments/sagas/postAttachment';

function* watchAttachmentsSagas() {
  yield trackRequests(takeEvery, types.POST_ATTACHMENT_REQUEST, postAttachment);
}

export default watchAttachmentsSagas;
