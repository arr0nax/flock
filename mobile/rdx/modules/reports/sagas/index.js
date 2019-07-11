import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../types';
import getReports from './getReports';
import postReport from './postReport';
import postReportVote from './postReportVote';

function* watchReportsSagas() {
  yield trackRequests(takeEvery, types.GET_REPORTS_REQUEST, getReports);
  yield trackRequests(takeEvery, types.POST_REPORT_REQUEST, postReport);
  yield trackRequests(takeEvery, types.POST_REPORT_VOTE_REQUEST, postReportVote);
}

export default watchReportsSagas;
