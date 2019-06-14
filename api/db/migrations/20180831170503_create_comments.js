exports.up = knex => knex.schema.createTable('comments', (table) => {
  table.increments('id').unsigned().primary();

  table.string('text', 1000).notNull();
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
  table.boolean('reported')
    .notNull()
    .defaultTo(false);
  table.timestamps([true], [true])

});

exports.down = knex => knex.schema.dropTable('comments');
