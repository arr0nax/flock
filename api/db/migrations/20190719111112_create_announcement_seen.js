exports.up = knex => knex.schema.createTable('announcement_seen', (table) => {
  table.increments('id').unsigned().primary();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('announcement_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('announcements');

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('announcement_seen');
