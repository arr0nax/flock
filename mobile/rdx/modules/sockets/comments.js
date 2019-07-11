import { put } from 'redux-saga/effects';
import actions from '../../actions.js';
//
export default {
  newComment: (store, data) => { console.log(store); store.dispatch(actions.addComment(data)) }
}
