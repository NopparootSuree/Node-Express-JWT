const { body } = require('express-validator');

// middleware สำหรับ validate request body
const validateCreateEmployees = [
    body('birth_date')
        .isDate().withMessage("Invalid date format")
        .notEmpty().withMessage('birth_date is required'),

    body('first_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('first_name is required'),
    
    body('last_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('last_name is required'),

    body('gender')
        .isString().withMessage("Invalid string format")
        .isIn(['male', 'female']).withMessage("Please enter only Male or Female")
        .notEmpty().withMessage('gender is required'),
    
    body('hire_date')
        .isDate().withMessage("Invalid date format")
        .notEmpty().withMessage('birth_date is required'),
  ];

  const validateUpdateEmployees = [
    body('first_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('first_name is required'),
    
    body('last_name')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('last_name is required'),
  ];

module.exports = { validateCreateEmployees, validateUpdateEmployees}