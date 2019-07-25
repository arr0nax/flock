import { put } from 'redux-saga/effects';
import actions from 'rdx/actions';
//
export default {
  newComment: (store, data) => { store.dispatch(actions.addComment(data)) }
}
