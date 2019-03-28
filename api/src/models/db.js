const knexConfig = require('../../knexfile.js')
const knex = require('knex')(knexConfig.development);

const Bookshelf = require('bookshelf')(knex);

// add plugins here
Bookshelf.plugin('pagination');
Bookshelf.plugin('registry')

export default Bookshelf;
