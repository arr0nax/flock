dropdb hapi-practice
createdb hapi-practice

./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run
