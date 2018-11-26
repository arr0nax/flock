import { takeEvery } from 'redux-saga/effects';
import trackRequests from 'mobile/rdx/utils/trackRequests';

import types from 'mobile/rdx/modules/reacts/types';
import getReacts from 'mobile/rdx/modules/reacts/sagas/getReacts';
import postReact from 'mobile/rdx/modules/reacts/sagas/postReact';

function* watchReactsSagas() {
  yield trackRequests(takeEvery, types.GET_REACTS_REQUEST, getReacts);
  yield trackRequests(takeEvery, types.POST_REACT_REQUEST, postReact);
}

export default watchReactsSagas;
