import get from 'lodash/get';

export default {
  getAuthToken: state => get(state, 'authToken', ''),
  getUser: state => get(state, 'user.data', ''),
  getLoggedIn: state => get(state, 'logged_in', ''),
  getLoginRequested: state => get(state, 'user.requested', ''),
  getLoginError: state => get(state, 'user.errors', ''),
  getRegisterRequested: state => get(state, 'register.requested', ''),
  getRegisterError: state => get(state, 'register.errors', ''),
};
