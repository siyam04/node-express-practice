/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()

/* importing controllers */
const cartController = require('../controllers/cartController')
const auth_middleware = require('../middlewares/auth')


/* routes */
router.post('/cart', auth_middleware.Auth, cartController.addToCart)
router.post('/cart/array', auth_middleware.Auth, cartController.addToCartArray)
router.get('/carts', auth_middleware.Auth, cartController.cartGet)
router.get('/cart/:id', auth_middleware.Auth, cartController.cartGet)
// router.put('/cart/:id', auth_middleware.Auth, cartController.cartUpdate)
router.delete('/cart/:id', auth_middleware.Auth, cartController.cartDelete)


/* exporting routes */
module.exports = router




