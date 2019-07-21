import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/attachments/types';
import postAttachment from 'rdx/modules/attachments/sagas/postAttachment';
import getAttachments from 'rdx/modules/attachments/sagas/getAttachments';

function* watchAttachmentsSagas() {
  yield trackRequests(takeEvery, types.POST_ATTACHMENT_REQUEST, postAttachment);
  yield trackRequests(takeEvery, types.GET_ATTACHMENTS_REQUEST, getAttachments);
}

export default watchAttachmentsSagas;
