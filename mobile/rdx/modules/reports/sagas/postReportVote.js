import { put, all } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';

function* postReportVote(action) {
  const { success, data, error } = yield* makeRequest.post(`/reports/${action.payload.report_id}/votes`, {vote: action.payload.vote});
  if (success && data) {
      yield put(actions.postReportVoteSuccess(data));
      yield put(actions.getReportVotes());
  } else {
      yield put(actions.postReportVoteFailure(error));
  }
  return null;
}

export default postReportVote;
