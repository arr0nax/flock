# run all tests
# -------------------------------------
psql -h localhost -U postgres -d postgres -p 5432 -c 'drop database flowjo_hub_test;'
psql -h localhost -U postgres -d postgres -p 5432 -c 'create database flowjo_hub_test;'

mkdir -p logs

npm run test-migrate-latest
./node_modules/.bin/cross-env NODE_ENV=test PORT=8081 ./node_modules/.bin/nyc --reporter=html --reporter=text ./node_modules/.bin/mocha --timeout=10000 --exit --require babel-register \
test/**/*spec.js
