exports.up = knex => knex.schema.createTable('attachments', (table) => {
  table.increments('id').unsigned().primary();

  table.string('filename'),

  table.string('item_type').notNull();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('item_id')
    .notNull()
    .unsigned();
  table.timestamps([true], [true])
});

exports.down = knex => knex.schema.dropTable('attachments');
