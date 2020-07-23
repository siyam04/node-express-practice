/*==================================== IMPORTING =============================*/
// packages
const {body} = require('express-validator')

/*==================================== FIELDS =============================*/
// 1. Registration (POST)
exports.registrationValidation = [
    body('username').isString().withMessage('must be alphaNumeric'),
    body('password').isLength({min: 8}).withMessage('must be at least 8 characters long'),
    body('email').isEmail().withMessage('must be a valid email address'),
    body('firstName').isString().withMessage('must be string'),
    body('firstName').isString().withMessage('must be string')
]

// 2. Login (POST)
exports.loginValidation = [
    body('email').isEmail().withMessage('must be a valid email address'),
    body('password').isLength({min: 8}).withMessage('must be at least 8 characters long')
]



