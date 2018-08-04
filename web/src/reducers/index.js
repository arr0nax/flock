import { combineReducers } from 'redux';

import { auth } from './auth';
import { post, posts } from './posts';

const rootReducer = combineReducers({
  auth,
  post,
  posts,
});


export default rootReducer
