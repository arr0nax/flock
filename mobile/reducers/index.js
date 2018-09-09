import { combineReducers } from 'redux';

import { auth } from './auth';
import { post, posts } from './posts';
import { comment, comments } from './comments';
import { reply, replies } from './replies';
import { react, reacts } from './reacts';


const rootReducer = combineReducers({
  auth,
  post,
  posts,
  comment,
  comments,
  reply,
  replies,
  react,
  reacts,
});


export default rootReducer;
