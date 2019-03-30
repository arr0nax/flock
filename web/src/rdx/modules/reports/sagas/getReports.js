import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* getReports(action) {
  const { success, data, error } = yield* makeRequest.get(`/reports`);
  if (success && data) {
    yield put(actions.getReportsSuccess(data));
  } else {
    yield put(actions.getReportsFailure({ error }));
  }
  return null;
}

export default getReports;
