const seedGroups = (knex, Promise) => Promise.all([
  knex('groups').insert({
    name: 'Flock1',
    code: 'sheep',
  }).returning('id')
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedGroups(knex, Promise)
]);
