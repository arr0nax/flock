import types from 'rdx/modules/posts/types';
import createAction from 'rdx/utils/createAction';

export default {
  getPosts: payload => createAction(types.GET_POSTS_REQUEST, payload),
  postPost: payload => createAction(types.POST_POST_REQUEST, payload),
  addPost: payload => createAction(types.ADD_POST, payload),
  setPosts: payload => createAction(types.SET_POSTS, payload),
};
