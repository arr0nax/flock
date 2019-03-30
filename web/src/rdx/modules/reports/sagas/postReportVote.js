import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postReportVote(action) {
  const { success, data, error } = yield* makeRequest.post(`/reports/${action.payload.report_id}/votes`, {vote: action.payload.vote});
  if (success && data) {
      yield put(actions.postReportVoteSuccess(data));
  } else {
      yield put(actions.postReportVoteFailure(error));
  }
  return null;
}

export default postReportVote;
