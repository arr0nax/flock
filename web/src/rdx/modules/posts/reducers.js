import createReducer from 'rdx/utils/createReducer';
import types from 'rdx/modules/posts/types';
import states from 'rdx/modules/posts/states';

export default {
  posts: createReducer(states.posts, {
    [types.SET_POSTS](state, action) {
      return action.payload;
    },
    [types.ADD_POST](state, action) {
      let newState = [...state]
      console.log(newState, state);
      newState.unshift(action.payload)
      return newState;
    },
  }),
};