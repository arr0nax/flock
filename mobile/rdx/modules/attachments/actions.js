import types from 'mobile/rdx/modules/attachments/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  postAttachment: payload => createAction(types.POST_ATTACHMENT_REQUEST, payload),
};
