/*==================================== IMPORTING =============================*/
// packages
const express = require('express')

// custom controllers
const cartController = require('../controllers/cartController')
const auth_middleware = require('../middlewares/auth')

/*==================================== CREATING ROUTER =============================*/
const router = express.Router()

/*==================================== ROUTES =============================*/
// 8. Cart Create and Update (POST)
router.post('/cart', auth_middleware.Auth, cartController.cartCreateUpdate)

// 9. Cart List (GET)
router.get('/cart', cartController.cartGet)

// 10. Cart Details (GET)
router.get('/cart/:id', cartController.cartGet)

// 11. Cart Delete (DELETE)
router.delete('/cart/:id', auth_middleware.Auth, cartController.cartDelete)

/*==================================== EXPORTING ROUTES =============================*/
module.exports = router