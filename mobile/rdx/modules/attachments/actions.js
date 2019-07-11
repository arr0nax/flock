import types from '../attachments/types';
import createAction from '../../utils/createAction';

export default {
  postAttachment: payload => createAction(types.POST_ATTACHMENT_REQUEST, payload),
};
