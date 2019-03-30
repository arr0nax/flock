import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/reports/types';
import states from 'rdx/modules/reports/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  reports: createReducer(states.DEFAULT_REPORTS_STATE, {
    [types.GET_REPORTS_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.GET_REPORTS_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        data: action.payload,
        requested: false,
      };
    },
    [types.GET_REPORTS_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
    [types.POST_REPORT_REQUEST](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: true,
      };
    },
    [types.POST_REPORT_SUCCESS](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        requested: false,
      };
    },
    [types.POST_REPORT_FAILURE](state, action) {
      var newState = cloneDeep(state);
      return {
        ...newState,
        errors: action.payload,
        requested: false,
      };
    },
  }),
};
