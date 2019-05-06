import types from 'rdx/modules/reportVotes/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReportVotes: payload => createAction(types.GET_REPORT_VOTES_REQUEST, payload),
  getReportVotesSuccess: payload => createAction(types.GET_REPORT_VOTES_SUCCESS, payload),
  getReportVotesFailure: payload => createAction(types.GET_REPORT_VOTES_FAILURE, payload),
  patchReportVote: payload => createAction(types.PATCH_REPORT_VOTE_REQUEST, payload),
  patchReportVoteSuccess: payload => createAction(types.PATCH_REPORT_VOTE_SUCCESS, payload),
  patchReportVoteFailure: payload => createAction(types.PATCH_REPORT_VOTE_FAILURE, payload),
  deleteReportVote: payload => createAction(types.DELETE_REPORT_VOTE_REQUEST, payload),
  deleteReportVoteSuccess: payload => createAction(types.DELETE_REPORT_VOTE_SUCCESS, payload),
  deleteReportVoteFailure: payload => createAction(types.DELETE_REPORT_VOTE_FAILURE, payload),
};
