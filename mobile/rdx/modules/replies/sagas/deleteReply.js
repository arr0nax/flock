import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* deleteReply(action) {
  const { item_id, parent_id } = action.payload;
  const { success, data, error } = yield* makeRequest.delete(`/replies/${item_id}`);
  if (success && data) {
    yield put(actions.deleteReplySuccess({item_id, parent_id}));
  } else {
    yield put(actions.deleteReplyFailure(error));
  }
  return null;
}

export default deleteReply;
