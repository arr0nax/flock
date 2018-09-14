exports.up = knex => knex.schema.createTable('comments', (table) => {
  table.increments('id').unsigned().primary();

  table.string('text').notNull();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('post_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('posts')
    .onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable('comments');
