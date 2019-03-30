import { put, all } from 'redux-saga/effects';

import makeRequest from 'rdx/utils/makeRequest';
import getErrorActions from 'rdx/utils/getErrorActions';
import actions from 'rdx/actions';

function* postReports(action) {
  const { success, data, error } = yield* makeRequest.post(`/reports`, action.payload);
  if (success && data) {
      yield put(actions.postReportSuccess(data));
  } else {
      yield put(actions.postReportFailure(error));
  }
  return null;
}

export default postReports;
