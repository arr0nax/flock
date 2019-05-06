import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'rdx/utils/trackRequests';

import types from 'rdx/modules/reportVotes/types';
import getReportVotes from 'rdx/modules/reportVotes/sagas/getReportVotes';
import patchReportVote from 'rdx/modules/reportVotes/sagas/patchReportVote';
import deleteReportVote from 'rdx/modules/reportVotes/sagas/deleteReportVote';

function* watchReportVotesSagas() {
  yield trackRequests(takeEvery, types.GET_REPORT_VOTES_REQUEST, getReportVotes);
  yield trackRequests(takeEvery, types.PATCH_REPORT_VOTE_REQUEST, patchReportVote);
  yield trackRequests(takeEvery, types.DELETE_REPORT_VOTE_REQUEST, deleteReportVote);
}

export default watchReportVotesSagas;
