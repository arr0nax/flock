import types from 'mobile/rdx/modules/posts/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  getPosts: payload => createAction(types.GET_POSTS_REQUEST, payload),
  getPostsSuccess: payload => createAction(types.GET_POSTS_SUCCESS, payload),
  getPostsFailure: payload => createAction(types.GET_POSTS_FAILURE, payload),
  setPosts: payload => createAction(types.SET_POSTS, payload),

  getMorePosts: payload => createAction(types.GET_MORE_POSTS_REQUEST, payload),
  getMorePostsSuccess: payload => createAction(types.GET_MORE_POSTS_SUCCESS, payload),
  getMorePostsFailure: payload => createAction(types.GET_MORE_POSTS_FAILURE, payload),
  addPosts: payload => createAction(types.ADD_POSTS, payload),

  postPost: payload => createAction(types.POST_POST_REQUEST, payload),
  postPostSuccess: payload => createAction(types.POST_POST_SUCCESS, payload),
  postPostFailure: payload => createAction(types.POST_POST_FAILURE, payload),
  addPost: payload => createAction(types.ADD_POST, payload),
  composePost: payload => createAction(types.COMPOSE_POST, payload),
};
