import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/topic/types';
import states from 'rdx/modules/topic/states';

export default {
  topic: createReducer(states.DEFAULT_TOPIC_STATE, {
    [types.GET_TOPIC_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
  }),
};
