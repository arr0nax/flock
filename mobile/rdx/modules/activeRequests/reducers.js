import createReducer from '../../utils/createReducer';
import types from '../../modules/activeRequests/types';
import states from '../../modules/activeRequests/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  activeRequests: createReducer(states.activeRequests, {
    [types.ADD_ACTIVE_REQUEST](state, action) {
      const newState = cloneDeep(state);
      newState[action.payload.type] = {requested: true};
      return newState;
    },
    [types.REMOVE_ACTIVE_REQUEST](state, action) {
      const newState2 = cloneDeep(state);
      newState2[action.payload.type] = {requested: false, error: action.payload.payload};
      return newState2;
    },
  }),
};
