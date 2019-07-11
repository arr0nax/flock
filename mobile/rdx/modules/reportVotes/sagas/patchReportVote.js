import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
