import { put, all } from 'redux-saga/effects';

import makeRequest from 'mobile/rdx/utils/makeRequest';
import getErrorActions from 'mobile/rdx/utils/getErrorActions';
import actions from 'mobile/rdx/actions';

function* postReacts(action) {
  const { success, data, error } = yield* makeRequest.post(`/reacts`, action.payload);
  console.log(data);
  if (success && data) {
    // yield put(actions.setReplies({data, parent_id: action.payload}));
    switch (data.item_type) {
      case 'post':
        yield put(actions.addPostReact(data));
        break;
      case 'comment':
        yield put(actions.addCommentReact(data));
        break;
      case 'reply':
        yield put(actions.addReplyReact(data));
        break;
    }
  } else {
    return getErrorActions({ error });
  }
  return null;
}

export default postReacts;
