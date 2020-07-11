exports.up = knex => knex.schema.table('users', (table) => {
    table.boolean('logged_in_today')
      .notNull()
      .defaultTo(false);
});

exports.down = knex => knex.schema.table('groups', (table) => {
  // table.dropColumn('logged_in_today');
});
