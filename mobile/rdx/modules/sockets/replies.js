import { put } from 'redux-saga/effects';
import actions from '../../actions';
//
export default {
  newReply: (store, data) => { store.dispatch(actions.addReply(data)) }
}
