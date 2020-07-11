import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../reportVotes/types';
import getReportVotes from '../../reportVotes/sagas/getReportVotes';
import patchReportVote from '../../reportVotes/sagas/patchReportVote';
import deleteReportVote from '../../reportVotes/sagas/deleteReportVote';

function* watchReportVotesSagas() {
  yield trackRequests(takeEvery, types.GET_REPORT_VOTES_REQUEST, getReportVotes);
  yield trackRequests(takeEvery, types.PATCH_REPORT_VOTE_REQUEST, patchReportVote);
  yield trackRequests(takeEvery, types.DELETE_REPORT_VOTE_REQUEST, deleteReportVote);
}

export default watchReportVotesSagas;
