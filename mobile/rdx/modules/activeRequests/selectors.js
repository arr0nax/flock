import types from '../../types';
import { createSelector } from 'reselect';

const getActiveRequests = state => state.activeRequests;

const getActiveRequestType = type => createSelector(
  getActiveRequests,
  activeRequests => activeRequests.filter(ar => ar.type === type).length > 0,
);

export default {
  getActiveRequests,
  // specific request types
  getCurrentAppReqActive: getActiveRequestType(types.REQUEST_GET_APP),
  getActivePostRequestRequests: getActiveRequestType(types.POST_REQUEST_REQUEST),
  getActiveLoginRequests: getActiveRequestType(types.LOGIN_REQUEST),
  getActiveLoginRequests: getActiveRequestType(types.REGISTER_REQUEST),
};
