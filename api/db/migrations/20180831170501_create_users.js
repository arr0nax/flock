exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments('id').unsigned().primary();

  table.string('first_name').notNull();
  table.string('last_name').notNull();
  table.string('email').notNull().unique();
  table.string('password').notNull();
  table.string('image_url').nullable();
});

exports.down = knex => knex.schema.dropTable('users');
