import { get } from 'lodash';

export default {
  getAuthToken: state => get(state, 'authToken', ''),
  getUser: state => get(state, 'user', ''),
  getLoggedIn: state => get(state, 'logged_in', ''),
};
