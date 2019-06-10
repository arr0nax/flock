import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

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
