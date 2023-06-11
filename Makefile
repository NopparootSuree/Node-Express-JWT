start:
	npm start

migrate:
	npx knex migrate:latest

migrateup:
	npx knex --knexfile knexfile.js migrate:up

migratedown:
	npx knex --knexfile knexfile.js migrate:down



.PHONY: start migrate migrateup migratedown