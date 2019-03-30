import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/reports/types';
import getReports from 'rdx/modules/reports/sagas/getReports';
import postReport from 'rdx/modules/reports/sagas/postReport';
import postReportVote from 'rdx/modules/reports/sagas/postReportVote';

function* watchReportsSagas() {
  yield trackRequests(takeEvery, types.GET_REPORTS_REQUEST, getReports);
  yield trackRequests(takeEvery, types.POST_REPORT_REQUEST, postReport);
  yield trackRequests(takeEvery, types.POST_REPORT_VOTE_REQUEST, postReportVote);
}

export default watchReportsSagas;
