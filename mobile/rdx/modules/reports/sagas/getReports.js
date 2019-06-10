import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

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
