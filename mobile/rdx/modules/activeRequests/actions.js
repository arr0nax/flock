import types from 'mobile/rdx/modules/activeRequests/types';
import createAction from 'mobile/rdx/utils/createAction';

export default {
  addActiveRequest: payload => createAction(types.ADD_ACTIVE_REQUEST, payload),
  removeActiveRequest: payload => createAction(types.REMOVE_ACTIVE_REQUEST, payload),
};
