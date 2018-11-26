import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postAttachment(action) {
  const { success, data, error } = yield* makeRequest.post(`/attachments`, action.payload);
  if (success && data) {

  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postAttachment;
