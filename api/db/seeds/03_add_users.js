const password = require('../../src/utils/password');

const seedUsers = (knex, Promise) => Promise.all([
  knex('users').insert({
    first_name: 'anonymous',
    last_name: 'sheep',
    email: '',
    password: '',
    image_url: null,
    role_id: 1,
    id: 0,
  }).returning('id'),
  knex('users').insert({
    first_name: 'string',
    last_name: 'sheep',
    email: 'string',
    password: password.generatePassword('string'),
    image_url: 'string',
    role_id: 1,
    group_id: 1,
  }).returning('id'),
  knex('users').insert({
    first_name: 'admin',
    last_name: 'sheep',
    email: 'admin',
    password: password.generatePassword('string'),
    image_url: 'string',
    role_id: 2,
  }).returning('id'),
  knex('users').insert({
    first_name: 'danger',
    last_name: 'sheep',
    email: 'danger',
    password: password.generatePassword('string'),
    image_url: 'string',
    role_id: 1,
    group_id: 1,
  }).returning('id'),
  knex('users').insert({
    first_name: 'asdf',
    last_name: 'sheep',
    email: 'asdf',
    password: password.generatePassword('asdf'),
    image_url: 'string',
    role_id: 1,
    group_id: 1,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedUsers(knex, Promise)
]);
