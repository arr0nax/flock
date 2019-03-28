exports.up = knex => knex.schema.createTable('posts', (table) => {
  table.increments('id').unsigned().primary();

  table.string('text').notNull();
  table.integer('interactions').defaultTo(0);
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('group_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('groups');
  table.boolean('reported')
    .notNull()
    .defaultTo(false);
  table.timestamps([true], [true])
});

exports.down = knex => knex.schema.dropTable('posts');
