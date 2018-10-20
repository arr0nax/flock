import BaseModel from './base';
import Post from './post';
import Comment from './comment';
import Reply from './reply';
import React from './react';
import Bcrypt from 'bcryptjs';
import Boom from 'boom';
import Joi from 'joi';
const TABLE_NAME = 'users';
import bookshelf from './db';

class User extends BaseModel {
  static validation = {
    create: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      first_name: Joi.string().allow(null).empty(''),
      last_name: Joi.string().allow(null).empty(''),
    },
    login: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }

  static get TABLE_NAME() {
    return TABLE_NAME;
  }

  get tableName() {
    return TABLE_NAME;
  }

  posts() {
    return this.hasMany(Post);
  }

  comments() {
    return this.hasMany(Comment);
  }

  replies() {
    return this.hasMany(Reply);
  }

  reacts() {
    return this.hasMany(React);
  }

  getPosts() {
    return this.posts().fetch();
  }

  getComments() {
    return this.comments().fetch();
  }

  getReplies() {
    return this.replies().fetch();
  }

  getReacts() {
    return this.reacts().fetch();
  }

  static async getInfo(id) {
    const user = await this.findByID(id);
    console.log(user);
    return {
      first_name: user.attributes.first_name,
      last_name: user.attributes.last_name,
      id: id,
    }
  }

  static findByEmail(email) {
    return this.findOne({}, {
      email,
    });
  }

  static validateLogin(user, password) {
    return new Promise((resolve, reject) => {
      if (user && user.password && Bcrypt.compareSync(password, user.password)) {
        resolve({
          success: true,
          id: user.id,
        });
      } else {
        reject(Boom.unauthorized('Invalid username / password', 'email/password', null));
      }
    });
  }
}

module.exports = bookshelf.model('User', User);
