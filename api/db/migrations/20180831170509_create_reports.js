exports.up = knex => knex.schema.createTable('reports', (table) => {
  table.increments('id').unsigned().primary();
  table.integer('group_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('groups');

  table.string('item_type').notNull();
  table.integer('item_id')
    .notNull()
    .unsigned();

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('reports');
