import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/reportVotes/types';
import getReportVotes from 'mobile/rdx/modules/reportVotes/sagas/getReportVotes';
import patchReportVote from 'mobile/rdx/modules/reportVotes/sagas/patchReportVote';
import deleteReportVote from 'mobile/rdx/modules/reportVotes/sagas/deleteReportVote';

function* watchReportVotesSagas() {
  yield trackRequests(takeEvery, types.GET_REPORT_VOTES_REQUEST, getReportVotes);
  yield trackRequests(takeEvery, types.PATCH_REPORT_VOTE_REQUEST, patchReportVote);
  yield trackRequests(takeEvery, types.DELETE_REPORT_VOTE_REQUEST, deleteReportVote);
}

export default watchReportVotesSagas;
