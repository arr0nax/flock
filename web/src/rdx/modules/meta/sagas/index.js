import { takeEvery } from 'redux-saga/effects';

import types from 'rdx/modules/meta/types';
import getInit from 'rdx/modules/meta/sagas/getInit';

function* watchMetaSagas() {
  yield takeEvery(types.GET_INIT_REQUEST, getInit);
}

export default watchMetaSagas;
