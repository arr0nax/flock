import { put } from 'redux-saga/effects';
import actions from '../../actions';
//
export default {
  newPost: (store, data) => { store.dispatch(actions.addPost(data)) }
}
