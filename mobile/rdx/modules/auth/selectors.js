import get from 'lodash/get';

export default {
  getAuthToken: state => get(state, 'authToken', ''),
  getUser: state => get(state, 'user.data', ''),
  getLoggedIn: state => get(state, 'logged_in', ''),
};
