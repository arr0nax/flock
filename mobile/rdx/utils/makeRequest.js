import { all, call, select } from 'redux-saga/effects';
import Api from './Api';

import authSelectors from '../modules/auth/selectors';

import Env from '../../env.js';

export const formatServerConnectionError = (e) => {
  // some sort of connection error
  console.log('connection error');
  if (Env.ENVIRONMENT === 'DEVELOPMENT') console.warn(e);
  const error = { text: 'There was an error connecting with the server' };
  return { success: false, data: null, error };
};

export const formatResponse = (response) => {
  if (response.error) {
    // TODO put other error data in there maybe
    const error = { text: response.message };
    return { success: false, error, data: null };
  }
  return { success: true, error: null, data: response };
};

const composeRequestManager = (verb) => {
  function* manageRequest(route, params) {
    const url = Env.API_ENDPOINT + route;
    const authToken = yield select(authSelectors.getAuthToken);
    try {
      const response = yield call(Api.xhr, url, verb, params, authToken);
      return formatResponse(response);
    } catch (e) {
      return formatServerConnectionError(e);
    }
  }
  return manageRequest;
};

const makeRequest = {
  delete: composeRequestManager('DELETE'),
  get: composeRequestManager('GET'),
  patch: composeRequestManager('PATCH'),
  post: composeRequestManager('POST'),
  put: composeRequestManager('PUT'),
};

export default makeRequest;

export function* makeMultipleRequests(requestArray) {
  const authToken = yield select(authSelectors.getAuthToken);
  const requests = requestArray.map(({ url, verb, params }) => (
    call(Api.xhr, url, verb, params, authToken)
  ));
  try {
    const responses = yield all(requests);
    return responses.map(response => formatResponse(response));
  } catch (e) {
    return formatServerConnectionError(e);
  }
}
