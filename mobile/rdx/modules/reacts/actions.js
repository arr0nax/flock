import types from 'mobile/rdx/modules/reacts/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  getReacts: payload => createAction(types.GET_REACTS_REQUEST, payload),
  getReactsSuccess: payload => createAction(types.GET_REACTS_SUCCESS, payload),
  getReactsFailure: payload => createAction(types.GET_REACTS_FAILURE, payload),
  postReact: payload => createAction(types.POST_REACT_REQUEST, payload),
  setPostReacts: payload => createAction(types.SET_POST_REACTS, payload),
  setCommentReacts: payload => createAction(types.SET_COMMENT_REACTS, payload),
  setReplyReacts: payload => createAction(types.SET_REPLY_REACTS, payload),
  addPostReact: payload => createAction(types.ADD_POST_REACT, payload),
  addCommentReact: payload => createAction(types.ADD_COMMENT_REACT, payload),
  addReplyReact: payload => createAction(types.ADD_REPLY_REACT, payload),
};
