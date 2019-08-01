const seedTopics = (knex, Promise) => Promise.all([
  knex('topics').insert({
    text: 'sheep',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'bread',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'google murray bookchin',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'theories',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'pics of your meal',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'favorite music',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
  knex('topics').insert({
    text: 'lipids',
    user_id: 0,
    group_id: 1,
  }).returning('id'),
]);

exports.seed = async (knex, Promise) => Promise.all([
  seedTopics(knex, Promise)
]);
