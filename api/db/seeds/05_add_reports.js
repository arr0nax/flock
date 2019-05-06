const seedReports = (knex, Promise) => Promise.all([
  knex('reports').insert({
    item_id: 2,
    item_type: 'post',
    item_text: 'reported post :(',
    user_id: 1,
    group_id: 1,
    resolved: false,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedReports(knex, Promise)
]);
