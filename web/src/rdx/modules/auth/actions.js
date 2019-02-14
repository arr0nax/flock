import types from 'rdx/modules/auth/types';
import createAction from 'rdx/utils/createAction';

export default {
  setAuthToken: authToken => createAction(types.SET_AUTH_TOKEN, authToken),
  setUser: payload => createAction(types.SET_USER, payload),
  requestLogin: payload => createAction(types.LOGIN_REQUEST, payload),
  requestLogout: payload => createAction(types.REQUEST_LOGOUT, payload),
  requestRegister: payload => createAction(types.REQUEST_REGISTER, payload),
};
