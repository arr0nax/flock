import { put } from 'redux-saga/effects';
import actions from 'rdx/actions';
//
export default {
  newPost: (store, data) => {
    const state = store.getState();
    if (state.group.data.id === data.group_id)
    store.dispatch(actions.addPost(data)) 
  }
}
