import get from 'lodash/get';

export default {
  getPosts: state => get(state, 'posts.data'),
  getPostsRequested: state => get(state, 'posts.requested'),
  getPostRequested: state => get(state, 'post.requested'),
  getPost: state => get(state, 'post.data'),
  getPostsPagination: state => get(state, 'posts.pagination')
};
