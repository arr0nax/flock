exports.up = knex => knex.schema.createTable('reports', (table) => {
  table.increments('id').unsigned().primary();
  table.integer('group_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('groups');
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.string('item_text').notNull();
  table.string('item_type').notNull();
  table.integer('item_id')
    .notNull()
    .unsigned();
  table.boolean('resolved').notNull().defaultTo(false);

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('reports');
