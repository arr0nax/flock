import types from 'rdx/modules/replies/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReplies: payload => createAction(types.GET_REPLIES_REQUEST, payload),
  setReplies: payload => createAction(types.SET_REPLIES, payload),
};
