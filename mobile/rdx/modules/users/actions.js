import types from '../users/types';
import createAction from '../../utils/createAction';

export default {
  getUser: payload => createAction(types.GET_USER_REQUEST, payload),
  getUserSuccess: payload => createAction(types.GET_USER_SUCCESS, payload),
  getUserFailure: payload => createAction(types.GET_USER_FAILURE, payload),
  patchUserGroup: payload => createAction(types.PATCH_USER_GROUP_REQUEST, payload),
  patchUserGroupSuccess: payload => createAction(types.PATCH_USER_GROUP_SUCCESS, payload),
  patchUserGroupFailure: payload => createAction(types.PATCH_USER_GROUP_FAILURE, payload),
  addUser: payload => createAction(types.ADD_USER, payload),
};
