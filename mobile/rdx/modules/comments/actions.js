import types from 'mobile/rdx/modules/comments/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  getComments: payload => createAction(types.GET_COMMENTS_REQUEST, payload),
  getCommentsSuccess: payload => createAction(types.GET_COMMENTS_SUCCESS, payload),
  getCommentsFailure: payload => createAction(types.GET_COMMENTS_FAILURE, payload),
  setComments: payload => createAction(types.SET_COMMENTS, payload),
  addComment: payload => createAction(types.ADD_COMMENT, payload),

  postComment: payload => createAction(types.POST_COMMENT_REQUEST, payload),
  postCommentSuccess: payload => createAction(types.POST_COMMENT_SUCCESS, payload),
  postCommentFailure: payload => createAction(types.POST_COMMENT_FAILURE, payload),

  getComment: payload => createAction(types.GET_COMMENT_REQUEST, payload),
  getCommentSuccess: payload => createAction(types.GET_COMMENT_SUCCESS, payload),
  getCommentFailure: payload => createAction(types.GET_COMMENT_FAILURE, payload),

  getCommentPost: payload => createAction(types.GET_COMMENT_POST_REQUEST, payload),
  getCommentPostSuccess: payload => createAction(types.GET_COMMENT_POST_SUCCESS, payload),
  getCommentPostFailure: payload => createAction(types.GET_COMMENT_POST_FAILURE, payload),
};
