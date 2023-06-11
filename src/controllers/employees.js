const { body, validationResult } = require('express-validator');
require('dotenv').config()
const db = require('../config/database')

// Middleware สำหรับ validate request body
const validateEmployees = [
    body('birth_date').isDate().withMessage("Invalid date format"),
    body('birth_date').notEmpty().withMessage('birth_date is required'),

    body('first_name').isString().withMessage("Invalid string format"),
    body('first_name').notEmpty().withMessage('first_name is required'),
    
    body('last_name').isString().withMessage("Invalid string format"),
    body('last_name').notEmpty().withMessage('last_name is required'),

    body('gender').isString().withMessage("Invalid string format"),
    body('gender').isIn(['male', 'female']).withMessage("Please enter only Male or Female"),
    body('gender').notEmpty().withMessage('gender is required'),
    
    body('hire_date').isDate().withMessage("Invalid date format"),
    body('hire_date').notEmpty().withMessage('birth_date is required'),
  ];

const createEmployees = (req, res) => {
	const errors = validationResult(req)
	if(!errors.isEmpty){
		return res.status(500).json({ errors: errors.array() })
	}

	const { birth_date, first_name, last_name, gender, hire_date } = req.body

	db('employees')
		.insert({ birth_date, first_name, last_name, gender, hire_date })
		.then(() => {
			res.status(200).json({ message: 'Employee created successfully' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Failed to create employee', error });
		})
}

module.exports = { validateEmployees, createEmployees };