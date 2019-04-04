import { put } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getReportVotes(action) {
  const { success, data, error } = yield* makeRequest.get(`/votes`);
  if (success && data) {
    yield put(actions.getReportVotesSuccess(data));
  } else {
    yield put(actions.getReportVotesFailure({ error }));
  }
  return null;
}

export default getReportVotes;
