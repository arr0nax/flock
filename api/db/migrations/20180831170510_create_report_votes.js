exports.up = knex => knex.schema.createTable('report_votes', (table) => {
  table.increments('id').unsigned().primary();
  table.integer('user_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('users');
  table.integer('report_id')
    .notNull()
    .unsigned()
    .references('id')
    .inTable('reports');
  table.boolean('vote')
    .nullable()
    .defaultTo(null)

  table.timestamps();
});

exports.down = knex => knex.schema.dropTable('report_votes');
