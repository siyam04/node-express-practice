// importing express
const express = require('express')

// creating router
const router = express.Router()

// importing controllers
const authController = require('../controllers/authController')


// routes
router.post('/register', authController.register)
router.get('/login', authController.login)
router.get('/logout', authController.logout)

// exporting routes
module.exports = router

