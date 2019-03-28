const seedReports = (knex, Promise) => Promise.all([
  knex('reports').insert({
    item_id: 2,
    item_type: 'post',
    group_id: 1,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedReports(knex, Promise)
]);
