import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* deleteReportVote(action) {
  const { success, data, error } = yield* makeRequest.delete(`/votes/${action.payload}`);
  if (success && data) {
    yield put(actions.deleteReportVoteSuccess(data));
    yield put(actions.getReportVotes());
  } else {
    yield put(actions.deleteReportVoteFailure({ error }));
  }
  return null;
}

export default deleteReportVote;
