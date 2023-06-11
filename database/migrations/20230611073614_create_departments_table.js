/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('departments', function(table) {
        table.string('dept_no', 8).notNullable().primary();
        table.string('dept_name', 100).notNullable().unique().index();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('departments')
};
