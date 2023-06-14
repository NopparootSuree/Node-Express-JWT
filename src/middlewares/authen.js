const { body } = require('express-validator');

const validateRegisterUsers = [
    body('username')
        .isString().withMessage("username must be a String")
        .notEmpty().withMessage('username is required'),

    body('password')
        .isString().withMessage("password must be a String")
        .notEmpty().withMessage('password is required'),
    
    body('email')
        .isEmail().withMessage("email must be a email")
        .notEmpty().withMessage('email is required'),
];

const validateLoginUsers = [
    body('username')
        .isString().withMessage("username must be a String")
        .notEmpty().withMessage('username is required'),

    body('password')
        .isString().withMessage("password must be a String")
        .notEmpty().withMessage('password is required'),
];

module.exports = { validateRegisterUsers, validateLoginUsers }