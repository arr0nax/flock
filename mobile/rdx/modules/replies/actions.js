import types from 'mobile/rdx/modules/replies/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  getReplies: payload => createAction(types.GET_REPLIES_REQUEST, payload),
  postReply: payload => createAction(types.POST_REPLY_REQUEST, payload),
  setReplies: payload => createAction(types.SET_REPLIES, payload),
  addReply: payload => createAction(types.ADD_REPLY, payload),
};
