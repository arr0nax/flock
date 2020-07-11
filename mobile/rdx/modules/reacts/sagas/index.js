import { takeEvery } from 'redux-saga/effects';
import trackRequests from '../../../utils/trackRequests';

import types from '../../reacts/types';
import getReacts from '../../reacts/sagas/getReacts';
import postReact from '../../reacts/sagas/postReact';

function* watchReactsSagas() {
  yield trackRequests(takeEvery, types.GET_REACTS_REQUEST, getReacts);
  yield trackRequests(takeEvery, types.POST_REACT_REQUEST, postReact);
}

export default watchReactsSagas;
