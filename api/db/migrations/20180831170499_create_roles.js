exports.up = knex => knex.schema.createTable('roles', (table) => {
  table.increments('id').primary();
  table.string('name').unique();
  table.string('description');
  table.timestamps([true], [true])

});

exports.down = knex => knex.schema.dropTable('roles');
