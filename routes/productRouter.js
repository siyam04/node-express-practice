/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()

/* importing controllers */
const productController = require('../controllers/productController')
const auth_middleware = require('../middlewares/auth')


/* routes */
router.post('/product', auth_middleware.Auth, productController.product)
// router.get('/product', auth_middleware.Auth, productController.product)
router.get('/product/:id', productController.product)
router.put('/product/:id', auth_middleware.Auth, productController.updateProduct) // Auth = Middleware
router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)

/* exporting routes */
module.exports = router


