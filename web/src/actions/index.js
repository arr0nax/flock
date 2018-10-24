import { login, logout, register } from './auth';
import { post, getPosts } from './posts';
import { comment, getComments } from './comments';
import { reply, getReplies } from './replies';
import { react, getReacts } from './reacts';
import { getNotifications } from './notifications';

export default {
  login,
  register,
  logout,
  post,
  getPosts,
  comment,
  getComments,
  reply,
  getReplies,
  react,
  getReacts,
  getNotifications,
}
