exports.up = knex => knex.schema.createTable('sessions', (table) => {
  table.increments('id').primary();
  table.string('key', 50).notNullable().index().unique();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');

  table.timestamps([true], [true])
});

exports.down = knex => knex.schema.dropTable('sessions');
