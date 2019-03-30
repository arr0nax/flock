import types from 'rdx/modules/reports/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReports: payload => createAction(types.GET_REPORTS_REQUEST, payload),
  getReportsSuccess: payload => createAction(types.GET_REPORTS_SUCCESS, payload),
  getReportsFailure: payload => createAction(types.GET_REPORTS_FAILURE, payload),
  postReport: payload => createAction(types.POST_REPORT_REQUEST, payload),
  postReportSuccess: payload => createAction(types.POST_REPORT_SUCCESS, payload),
  postReportFailure: payload => createAction(types.POST_REPORT_FAILURE, payload),
  postReportVote: payload => createAction(types.POST_REPORT_VOTE_REQUEST, payload),
  postReportVoteSuccess: payload => createAction(types.POST_REPORT_VOTE_SUCCESS, payload),
  postReportVoteFailure: payload => createAction(types.POST_REPORT_VOTE_FAILURE, payload),
  setReports: payload => createAction(types.SET_REPORTS, payload),
  addReport: payload => createAction(types.ADD_REPORT, payload),
};
