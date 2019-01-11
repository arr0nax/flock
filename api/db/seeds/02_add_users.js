const password = require('../../src/utils/password');

const seedUsers = (knex, Promise) => Promise.all([
  knex('users').insert({
    first_name: 'string',
    last_name: 'sheep',
    email: 'string',
    password: password.generatePassword('string'),
    image_url: 'string',
    role_id: 1,
  }).returning('id'),
  knex('users').insert({
    first_name: 'admin',
    last_name: 'sheep',
    email: 'admin',
    password: password.generatePassword('string'),
    image_url: 'string',
    role_id: 2,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedUsers(knex, Promise)
]);
