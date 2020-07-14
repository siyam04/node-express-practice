/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()

/* importing controllers */
const cartController = require('../controllers/cartController')
const auth_middleware = require('../middlewares/auth')


/* routes */
router.post('/cart', auth_middleware.Auth, cartController.addToCart)
router.get('/cart', auth_middleware.Auth, cartController.cartGet)
router.get('/cart/:id', auth_middleware.Auth, cartController.cartGet)
router.delete('/cart/:id', auth_middleware.Auth, cartController.cartDelete)


/* exporting routes */
module.exports = router




