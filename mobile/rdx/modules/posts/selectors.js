import get from 'lodash/get';

export default {
  getPosts: state => get(state, 'posts.data'),
  getPostsRequested: state => get(state, 'posts.requested')
};
