import { put } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

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
