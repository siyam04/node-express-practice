/* importing */
const express = require('express')
const {body} = require('express-validator')

/* creating router */
const router = express.Router()

/* importing controllers */
const authController = require('../controllers/authController')


/* routes */
// express-validator added
router.post('/register', [body('username').isString(),
    body('password').isLength({min: 8}).withMessage('must be at least 8 chars long'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('firstName').isString().withMessage('Frist name will be string'),
    body('lastName').isString().withMessage('Last name will be string'),
], authController.register)

// express-validator added
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 8})
], authController.login)

// router.post('/logout', authController.logout)


/* exporting routes */
module.exports = router

