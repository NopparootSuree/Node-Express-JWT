const { body } = require('express-validator');

// middleware สำหรับ validate request body
const validateCreateEmployees = [
    body('birth_date')
        .isDate().withMessage("birth_date must be a Date")
        .notEmpty().withMessage('birth_date is required'),

    body('first_name')
        .isString().withMessage("first_name must be a String")
        .notEmpty().withMessage('first_name is required'),
    
    body('last_name')
        .isString().withMessage("last_name must be a String")
        .notEmpty().withMessage('last_name is required'),

    body('gender')
        .isString().withMessage("gender must be a String")
        .isIn(['male', 'female']).withMessage("Please enter only male or female")
        .notEmpty().withMessage('gender is required'),
    
    body('hire_date')
        .isDate().withMessage("hire_date must be a Date")
        .notEmpty().withMessage('birth_date is required'),
];

const validateUpdateEmployees = [
    body('first_name')
        .isString().withMessage("first_name must be a String")
        .notEmpty().withMessage('first_name is required'),
    
    body('last_name')
        .isString().withMessage("last_name must be a String")
        .notEmpty().withMessage('last_name is required'),
];

module.exports = { validateCreateEmployees, validateUpdateEmployees}