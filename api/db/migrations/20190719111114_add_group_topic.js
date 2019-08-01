exports.up = knex => knex.schema.table('groups', (table) => {
  table.integer('topic_id')
    .references('id')
    .inTable('topics');
  table.boolean('topic_chosen')
    .notNull()
    .defaultTo(false)
  table.integer('topic_choser_id')
    .references('id')
    .inTable('users');
});

exports.down = knex => knex.schema.table('groups', (table) => {
  table.dropColumn('topic_id');
  table.dropColumn('topic_chosen');
  table.dropColumn('topic_choser_id');
});
