/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('salaries', function(table) {
        table.integer('emp_no').unsigned().notNullable().references('emp_no').inTable('employees').onDelete('CASCADE').index();
        table.integer('salary', 11).notNullable();
        table.date('from_date').notNullable();
        table.date('to_date');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('salaries')
};
