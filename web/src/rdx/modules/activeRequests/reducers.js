import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/activeRequests/types';
import states from 'rdx/modules/activeRequests/states';

export default {
  activeRequests: createReducer(states.activeRequests, {
    [types.ADD_ACTIVE_REQUEST](state, action) {
      const newState = {
        ...state,
      }
      newState[action.payload.type] = true;
      return newState;
    },
    [types.REMOVE_ACTIVE_REQUEST](state, action) {
      const newState2 = {
        ...state,
      }
      newState2[action.payload.type] = false;
      return newState2;
    },
  }),
};
