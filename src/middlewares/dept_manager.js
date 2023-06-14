const { body } = require('express-validator');

const validateCreateDeptManager = [
    body('emp_no')
        .notEmpty().withMessage('emp_no is required')
        .isInt().withMessage('emp_no must be an integer')
        .isNumeric({ no_symbols: true }).withMessage('emp_no must be a positive number'),
    
    body('dept_no')
        .isString().withMessage("dept_no must be a String")
        .notEmpty().withMessage('dept_no is required'),

    body('from_date')
        .isDate().withMessage("from_date must be a Date")
        .notEmpty().withMessage('from_date is required'),
    
    body('to_date')
        .isDate().withMessage("to_date must be a Date")
        .notEmpty().withMessage('to_date is required'),
];


module.exports = { validateCreateDeptManager }