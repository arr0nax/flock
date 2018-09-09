exports.up = knex => knex.schema.createTable('posts', (table) => {
  table.increments('id').unsigned().primary();

  table.string('text').notNull();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
});

exports.down = knex => knex.schema.dropTable('posts');
