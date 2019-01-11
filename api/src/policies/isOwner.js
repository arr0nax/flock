import User from '../models/user';
import Post from '../models/post';
import Reply from '../models/reply';
import Comment from '../models/comment';
import React from '../models/react';
import Boom from 'boom';

const isOwner = async function(request, h) {
  try {
    const role = User.getRole(request.auth.credentials.user_id)
    if (role && role === 'admin') {
      return h.continue;
    }
    const splitPath = request.url.pathname.split('/')
    const type = splitPath[1];
    const id = splitPath[2];
    switch(type) {
      case 'posts':
        const post = await Post.findByID(id);
        if (post && post.attributes.user_id === request.auth.credentials.user_id) {
          return h.continue;
        }
      case 'comments':
        const comment = await Comment.findByID(id);
        if (comment && comment.attributes.user_id === request.auth.credentials.user_id) {
          return h.continue;
        }
      case 'replies':
        const reply = await Reply.findByID(id);
        if (reply && reply.attributes.user_id === request.auth.credentials.user_id) {
          return h.continue;
        }
      case 'reacts':
        const react = await React.findByID(id);
        if (react && react.attributes.user_id === request.auth.credentials.user_id) {
          return h.continue;
        }
    }
    // const type = await User.findByID(request.auth.credentials.user_id);
    // const userRole = await user.getRole();
    // if (userRole && userRole.attributes.name === 'admin') {
    //   return h.continue;
    // }
    return Boom.forbidden('You must own an item to edit it');
  } catch (err) {
    return Boom.forbidden(err.message);
  }
};

isOwner.applyPoint = 'onPreHandler';

module.exports = isOwner;
