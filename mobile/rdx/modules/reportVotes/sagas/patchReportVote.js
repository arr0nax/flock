import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* patchReportVote(action) {
  const { success, data, error } = yield* makeRequest.patch(`/votes/${action.payload.id}`, {vote: action.payload.vote});
  if (success && data) {
    yield put(actions.patchReportVoteSuccess(data));
    yield put(actions.getReportVotes());
  } else {
    yield put(actions.patchReportVoteFailure({ error }));
  }
  return null;
}

export default patchReportVote;
