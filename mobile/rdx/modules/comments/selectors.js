import get from 'lodash/get';

export default {
  getComments: state => get(state, 'comments.data'),
  getCommentsRequested: state => get(state, 'comments.requested'),
};
