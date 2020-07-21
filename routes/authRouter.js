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
    body('password').isLength({min: 8}),
    body('email').isEmail(),
    body('firstName').isString(),
    body('firstName').isString()
], authController.register)

// express-validator added
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 8})
], authController.login)

// router.post('/logout', authController.logout)


/* exporting routes */
module.exports = router

