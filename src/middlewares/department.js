const { body } = require('express-validator');

const validateCreateDepartments = [
    body('dept_no')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('dept_no is required'),
    
    body('dept_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('dept_name is required'),

];

const validateUpdateDepartments = [
    body('dept_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('dept_name is required'),
];


module.exports = { validateCreateDepartments, validateUpdateDepartments }