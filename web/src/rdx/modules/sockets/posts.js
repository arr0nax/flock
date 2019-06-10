import { put } from 'redux-saga/effects';
import actions from 'rdx/actions';
//
export default {
  newPost: (store, data) => { console.log(store); store.dispatch(actions.addPost(data)) }
}
