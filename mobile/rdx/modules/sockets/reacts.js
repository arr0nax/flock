import { put } from 'redux-saga/effects';
import actions from '../../actions';
//
export default {
  newReact: (store, data) => {
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
