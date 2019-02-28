import createReducer from 'mobile/rdx/utils/createReducer';
import types from 'mobile/rdx/modules/posts/types';
import states from 'mobile/rdx/modules/posts/states';
import cloneDeep from 'lodash/cloneDeep';

export default {
  posts: createReducer(states.posts, {
    [types.SET_POSTS](state, action) {
      return {
        data: action.payload,
        requested: false,
        errors: state.errors
      };
    },
    [types.ADD_POST](state, action) {
      let newState = cloneDeep(state)
      newState.data.unshift(action.payload)
      return newState;
    },
    [types.GET_POSTS_REQUEST](state, action) {
      let newState = cloneDeep(state)
      newState.requested = true;
      return newState;
    },
  }),
};
