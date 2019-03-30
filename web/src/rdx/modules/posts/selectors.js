import get from 'lodash/get';

export default {
  getPosts: state => get(state, 'posts.data'),
  getPostsRequested: state => get(state, 'posts.requested'),
  getNewPostRequested: state => get(state, 'new_post.requested'),
  getNewPostErrors: state => get(state, 'new_post.errors'),
  getNewPost: state => get(state, 'new_post.data'),
  getPostsPagination: state => get(state, 'posts.pagination')
};
