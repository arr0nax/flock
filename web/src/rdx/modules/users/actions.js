import types from 'rdx/modules/users/types';
import createAction from 'rdx/utils/createAction';

export default {
  getUser: payload => createAction(types.GET_USER_REQUEST, payload),
  patchUserGroup: payload => createAction(types.PATCH_USER_GROUP_REQUEST, payload),
  addUser: payload => createAction(types.ADD_USER, payload),
};
