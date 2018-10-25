import types from 'rdx/modules/reacts/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReacts: payload => createAction(types.GET_REACTS_REQUEST, payload),
  setPostReacts: payload => createAction(types.SET_POST_REACTS, payload),
  setCommentReacts: payload => createAction(types.SET_COMMENT_REACTS, payload),
  setReplyReacts: payload => createAction(types.SET_REPLY_REACTS, payload),
};
