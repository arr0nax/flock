exports.up = knex => knex.schema.createTable('notifications', (table) => {
  table.increments('id').unsigned().primary();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('made_by')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('parent_id')
    .unsigned()
    .notNull();
  table.string('parent_type')
    .notNull();
  table.boolean('new')
    .notNull()
    .defaultTo(true)

  table.string('item_type').notNull();
  table.integer('item_id')
    .notNull()
    .unsigned();

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('notifications');
