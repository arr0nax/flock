exports.up = knex => knex.schema.createTable('replies', (table) => {
  table.increments('id').unsigned().primary();

  table.string('text').notNull();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('comment_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('comments')
    .onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable('replies');
