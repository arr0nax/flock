import get from 'lodash/get';

export default {
  getUsers: state => get(state, 'users.data'),
  getUsersRequested: state => get(state, 'users.requested'),
};
