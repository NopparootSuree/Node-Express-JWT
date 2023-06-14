/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('user_id').notNullable().primary();
        table.string('username', 50).notNullable().unique().index();
        table.string('password', 100).notNullable();
        table.string('email', 50).notNullable().unique().index();
        table.date('createdAt').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
