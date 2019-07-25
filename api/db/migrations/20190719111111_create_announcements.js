exports.up = knex => knex.schema.createTable('announcements', (table) => {
  table.increments('id').unsigned().primary();
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
  table.string('text', 1000).notNull();

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('announcements');
