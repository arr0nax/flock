import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/reports/types';
import getReports from 'mobile/rdx/modules/reports/sagas/getReports';
import postReport from 'mobile/rdx/modules/reports/sagas/postReport';
import postReportVote from 'mobile/rdx/modules/reports/sagas/postReportVote';

function* watchReportsSagas() {
  yield trackRequests(takeEvery, types.GET_REPORTS_REQUEST, getReports);
  yield trackRequests(takeEvery, types.POST_REPORT_REQUEST, postReport);
  yield trackRequests(takeEvery, types.POST_REPORT_VOTE_REQUEST, postReportVote);
}

export default watchReportsSagas;
