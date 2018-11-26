import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* postAttachment(action) {
  const { success, data, error } = yield* makeRequest.post(`/attachments`, action.payload);
  if (success && data) {

  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postAttachment;
