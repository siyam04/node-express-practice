/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()

/* importing controllers */
const cartController = require('../controllers/cartController')


/* routes */
router.post('/cart', cartController.addToCart)
router.get('/carts', cartController.cartGet)
router.get('/cart/:id', cartController.cartGet)
// router.put('/cart/:id', cartController.cartUpdate)
router.delete('/cart/:id', cartController.cartDelete)


/* exporting routes */
module.exports = router




