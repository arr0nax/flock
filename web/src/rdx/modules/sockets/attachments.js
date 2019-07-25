import { put } from 'redux-saga/effects';
import actions from 'rdx/actions';
//
export default {
  newAttachment: (store, data) => {
    switch (data.data.item_type) {
      case 'post':
        store.dispatch(actions.addPostAttachment(data.data))
        break;
      case 'comment':
        store.dispatch(actions.addCommentAttachment(data.data))
        break;
      case 'reply':
        store.dispatch(actions.addReplyAttachment(data.data))
        break;
      default:
        break;
    }
  }
}
