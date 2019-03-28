const seedPosts = (knex, Promise) => Promise.all([
  knex('posts').insert({
    text: 'first post!',
    user_id: 1,
    group_id: 1,
  }).returning('id'),
  knex('posts').insert({
    text: 'reported post :(',
    user_id: 1,
    group_id: 1,
    reported: true,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedPosts(knex, Promise)
]);
