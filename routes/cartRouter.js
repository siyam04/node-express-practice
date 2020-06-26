/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()

/* importing controllers */
// const productController = require('../controllers/productController')


/* routes */
router.post('/cart', cartController.cart)

/* routes */
// router.post('/product', productController.product)
// router.get('/product', productController.product)
// router.get('/product/:id', productController.product)
// router.put('/product/:id', productController.updateProduct)
// router.delete('/product/:id', productController.deleteProduct)

/* exporting routes */
module.exports = router


