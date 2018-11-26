import types from 'mobile/rdx/modules/users/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  getUser: payload => createAction(types.GET_USER_REQUEST, payload),
  addUser: payload => createAction(types.ADD_USER, payload),
};
