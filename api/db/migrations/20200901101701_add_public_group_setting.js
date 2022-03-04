exports.up = knex => knex.schema.table('groups', (table) => {
    table.boolean('public')
      .notNull()
      .defaultTo(true);
});

exports.down = knex => knex.schema.table('groups', (table) => {
  table.dropColumn('logged_in_today');
});
