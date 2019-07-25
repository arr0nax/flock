import { put } from 'redux-saga/effects';
import actions from 'rdx/actions';
//
export default {
  newReply: (store, data) => { store.dispatch(actions.addReply(data)) }
}
