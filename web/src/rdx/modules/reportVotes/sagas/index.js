import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/reportVotes/types';
import getReportVotes from 'rdx/modules/reportVotes/sagas/getReportVotes';

function* watchReportVotesSagas() {
  yield trackRequests(takeEvery, types.GET_REPORT_VOTES_REQUEST, getReportVotes);
}

export default watchReportVotesSagas;
