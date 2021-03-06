import { put, select } from 'redux-saga/effects';

import makeRequest from '../../../utils/makeRequest';
import getErrorActions from '../../../utils/getErrorActions';
import actions from '../../../actions';
import authSelectors from '../../auth/selectors';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function* postAttachment(action) {
  const authToken = yield select(authSelectors.getAuthToken);
  const formData = new FormData();
  formData.append('file', action.payload.attachment);
  formData.append('filename', 'test');
  formData.append('item_id', action.payload.item_id);
  formData.append('item_type', action.payload.item_type);
  const stuff = yield fetch(`${API_ENDPOINT}/attachments`, {
      method: 'POST',
      headers: {
        'Authorization': authToken
      },
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      return images;
    })
    .catch( error => {
      return getErrorActions({ error });
    })
  if (action.payload.item_type === "profile_picture") {
    yield put(actions.setUserPicture(stuff.data))
  }
  // const { success, data, error } = yield* makeRequest.post(`/attachments`, action.payload);
  // if (success && data) {
  //
  // } else {
  // }
  return null;
}

export default postAttachment;
