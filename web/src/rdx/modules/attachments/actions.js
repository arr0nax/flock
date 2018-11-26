import types from 'rdx/modules/attachments/types';
import createAction from 'rdx/utils/createAction';

export default {
  postAttachment: payload => createAction(types.POST_ATTACHMENT_REQUEST, payload),
};
