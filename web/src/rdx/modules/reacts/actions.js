import types from 'rdx/modules/reacts/types';
import createAction from 'rdx/utils/createAction';

export default {
  getReacts: payload => createAction(types.GET_REACTS_REQUEST, payload),
  getReactsSuccess: payload => createAction(types.GET_REACTS_SUCCESS, payload),
  getReactsFailure: payload => createAction(types.GET_REACTS_FAILURE, payload),
  postReact: payload => createAction(types.POST_REACT_REQUEST, payload),
  postCommentReactSuccess: payload => createAction(types.POST_COMMENT_REACT_SUCCESS, payload),
  postCommentReactFailure: payload => createAction(types.POST_COMMENT_REACT_FAILURE, payload),
  postPostReactSuccess: payload => createAction(types.POST_POST_REACT_SUCCESS, payload),
  postPostReactFailure: payload => createAction(types.POST_POST_REACT_FAILURE, payload),
  postReplyReactSuccess: payload => createAction(types.POST_REPLY_REACT_SUCCESS, payload),
  postReplyReactFailure: payload => createAction(types.POST_REPLY_REACT_FAILURE, payload),
  setPostReacts: payload => createAction(types.SET_POST_REACTS, payload),
  setCommentReacts: payload => createAction(types.SET_COMMENT_REACTS, payload),
  setReplyReacts: payload => createAction(types.SET_REPLY_REACTS, payload),
  initSetPostReacts: payload => createAction(types.INIT_SET_POST_REACTS, payload),
  initSetCommentReacts: payload => createAction(types.INIT_SET_COMMENT_REACTS, payload),
  initSetReplyReacts: payload => createAction(types.INIT_SET_REPLY_REACTS, payload),
  addPostReact: payload => createAction(types.ADD_POST_REACT, payload),
  addCommentReact: payload => createAction(types.ADD_COMMENT_REACT, payload),
  addReplyReact: payload => createAction(types.ADD_REPLY_REACT, payload),
};
