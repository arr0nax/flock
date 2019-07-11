import { put } from 'redux-saga/effects';
import actions from '../../actions.js';
//
export default {
  newPost: (store, data) => { console.log(store); store.dispatch(actions.addPost(data)) }
}
