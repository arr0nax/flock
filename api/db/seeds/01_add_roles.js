const seedRoles = (knex, Promise) => Promise.all([
  knex('roles').insert({
    name: 'user',
    description: 'A standard user.',
  }).returning('id'),
  knex('roles').insert({
    name: 'admin',
    description: 'A user with advanced permissions.',
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedRoles(knex, Promise)
]);
