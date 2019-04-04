import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/reportVotes/types';
import states from 'rdx/modules/reportVotes/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  report_votes: createReducer(states.DEFAULT_REPORT_VOTES_STATE, {
    [types.GET_REPORT_VOTES_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_REPORT_VOTES_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        data: action.payload,
        requested: false,
      };
    },
    [types.GET_REPORT_VOTES_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
