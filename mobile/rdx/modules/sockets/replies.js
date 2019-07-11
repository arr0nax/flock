import { put } from 'redux-saga/effects';
import actions from '../../actions.js';
//
export default {
  newReply: (store, data) => { console.log(store); store.dispatch(actions.addReply(data)) }
}
