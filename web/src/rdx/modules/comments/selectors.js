import get from 'lodash/get';

export default {
  getComments: state => get(state, 'comments.data'),
};
