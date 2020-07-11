import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../attachments/types';
import postAttachment from '../../attachments/sagas/postAttachment';
import getAttachments from '../../attachments/sagas/getAttachments';

function* watchAttachmentsSagas() {
  yield trackRequests(takeEvery, types.POST_ATTACHMENT_REQUEST, postAttachment);
  yield trackRequests(takeEvery, types.GET_ATTACHMENTS_REQUEST, getAttachments);
}

export default watchAttachmentsSagas;
