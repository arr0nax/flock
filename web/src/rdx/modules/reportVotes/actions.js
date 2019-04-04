import types from 'rdx/modules/reportVotes/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReportVotes: payload => createAction(types.GET_REPORT_VOTES_REQUEST, payload),
  getReportVotesSuccess: payload => createAction(types.GET_REPORT_VOTES_SUCCESS, payload),
  getReportVotesFailure: payload => createAction(types.GET_REPORT_VOTES_FAILURE, payload),
};
