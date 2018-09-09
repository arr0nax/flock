const knexConfig = require('../../knexfile.js')
const knex = require('knex')(knexConfig.development);

const bookshelf = require('bookshelf')(knex);

// add plugins here
// b.plugin('pagination');

module.exports = bookshelf;
