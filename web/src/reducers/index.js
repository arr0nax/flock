import { combineReducers } from 'redux';

import { auth } from './auth';
import { post, posts } from './posts';
import { comment, comments } from './comments';
import { reply, replies } from './replies';
import { react, reacts } from './reacts';
import { users } from './users';
import { notifications } from './notifications';


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
  users,
  notifications,
});


export default rootReducer;
