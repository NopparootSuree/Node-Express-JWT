/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dept_emp', function(table) {
        table.integer('emp_no', 10).notNullable().references('emp_no').inTable('employees').onDelete('CASCADE').index();
        table.string('dept_no', 8).notNullable().references('dept_no').inTable('departments').onDelete('CASCADE').index();
        table.date('from_date').notNullable();
        table.date('to_date');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dept_emp')
};
