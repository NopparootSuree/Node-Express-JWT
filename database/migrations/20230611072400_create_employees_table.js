/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table) {
        table.integer('emp_no', 10).notNullable().primary();
        table.date('birth_date').notNullable();
        table.string('first_name', 100).notNullable().index();
        table.string('last_name', 100).notNullable().index();
        table.string('gender', 10).notNullable();
        table.date('hire_date').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('employees')
};
