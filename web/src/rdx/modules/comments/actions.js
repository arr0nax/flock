import types from 'rdx/modules/comments/types';
import createAction from 'rdx/utils/createAction';

export default {
  getComments: payload => createAction(types.GET_COMMENTS_REQUEST, payload),
  postComment: payload => createAction(types.POST_COMMENT_REQUEST, payload),
  setComments: payload => createAction(types.SET_COMMENTS, payload),
  addComment: payload => createAction(types.ADD_COMMENT, payload),
};
