import types from '../../modules/group/types';
import createAction from '../../utils/createAction';

export default {
  getUserGroup: payload => createAction(types.GET_USER_GROUP_REQUEST, payload),
  getUserGroupSuccess: payload => createAction(types.GET_USER_GROUP_SUCCESS, payload),
  getUserGroupFailure: payload => createAction(types.GET_USER_GROUP_FAILURE, payload),
};
