export default function createReducer(initialState, handlers) {
  if (handlers.hasOwnProperty(undefined)) {  // eslint-disable-line
    console.error('reducer created with undefined handler, check your type constants');
  }
  return function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
