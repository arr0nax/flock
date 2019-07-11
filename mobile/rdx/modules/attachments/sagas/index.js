import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import postAttachment from './postAttachment';

function* watchAttachmentsSagas() {
  yield trackRequests(takeEvery, types.POST_ATTACHMENT_REQUEST, postAttachment);
}

export default watchAttachmentsSagas;
