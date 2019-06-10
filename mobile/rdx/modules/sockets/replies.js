import { put } from 'redux-saga/effects';
import actions from 'mobile/rdx/actions';
//
export default {
  newReply: (store, data) => { console.log(store); store.dispatch(actions.addReply(data)) }
}
