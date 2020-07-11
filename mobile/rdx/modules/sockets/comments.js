import { put } from 'redux-saga/effects';
import actions from '../../actions';
//
export default {
  newComment: (store, data) => { store.dispatch(actions.addComment(data)) }
}
