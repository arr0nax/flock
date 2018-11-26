import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/attachments/types';
import postAttachment from 'rdx/modules/attachments/sagas/postAttachment';

function* watchAttachmentsSagas() {
  yield trackRequests(takeEvery, types.POST_ATTACHMENT_REQUEST, postAttachment);
}

export default watchAttachmentsSagas;
