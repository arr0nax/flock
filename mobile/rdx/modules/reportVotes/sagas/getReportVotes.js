import { put } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

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
