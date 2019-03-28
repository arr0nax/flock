import types from 'rdx/modules/auth/types';
import createAction from 'rdx/utils/createAction';

export default {
  setAuthToken: authToken => createAction(types.SET_AUTH_TOKEN, authToken),
  setUser: payload => createAction(types.SET_USER, payload),
  
  requestLogin: payload => createAction(types.LOGIN_REQUEST, payload),
  loginSuccess: payload => createAction(types.LOGIN_SUCCESS, payload),
  loginFailure: payload => createAction(types.LOGIN_FAILURE, payload),

  requestLogout: payload => createAction(types.LOGOUT_REQUEST, payload),
  logoutSuccess: payload => createAction(types.LOGOUT_SUCCESS, payload),
  logoutFailure: payload => createAction(types.LOGOUT_FAILURE, payload),

  requestRegister: payload => createAction(types.REGISTER_REQUEST, payload),
  registerSuccess: payload => createAction(types.REGISTER_SUCCESS, payload),
  registerFailure: payload => createAction(types.REGISTER_FAILURE, payload),
};
