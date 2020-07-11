import createReducer from '../../utils/createReducer';
import types from '../../modules/topic/types';
import states from '../../modules/topic/states';

export default {
  topic: createReducer(states.DEFAULT_TOPIC_STATE, {
    [types.GET_TOPIC_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
    [types.POST_TOPIC_SUCCESS](state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
  }),
};
