exports.up = knex => knex.schema.createTable('groups', (table) => {
  table.increments('id').unsigned().primary();
  table.string('name');
  table.string('code');

});

exports.down = knex => knex.schema.dropTable('groups');
