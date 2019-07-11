import { put } from 'redux-saga/effects';
import actions from '../../actions.js';
//
export default {
  newReact: (store, data) => {
    console.log(data);
    switch (data.item_type) {
      case 'post':
        store.dispatch(actions.addPostReact(data))
        break;
      case 'comment':
        store.dispatch(actions.addCommentReact(data))
        break;
      case 'reply':
        store.dispatch(actions.addReplyReact(data))
        break;
      default:
        break;
    }
  }
}
