import { login, logout, register } from './auth';
import { post, getPosts } from './posts';
import { comment, getComments } from './comments';
import { reply, getReplies } from './replies';

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
}
