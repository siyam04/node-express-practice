/* importing express */
const express = require('express')

/* creating router */
const router = express.Router()
const { body} = require('express-validator');

/* importing controllers */
const productController = require('../controllers/productController')
const auth_middleware = require('../middlewares/auth')


/* routes */
router.post('/product',
[
    body('name').isString(),
    body('category').isString(),
    body('price').isFloat(),
    body('quantity').isNumeric(),
    body('description').isString()
],
productController.product)

router.get('/product', productController.product)
router.get('/product/:id', productController.product)
router.put('/product/:id', 
[
    body('name').isString(),
    body('category').isString(),
    body('price').isFloat(),
    body('quantity').isNumeric(),
    body('description').isString()
],
productController.updateProduct)

router.delete('/product/:id', auth_middleware.Auth, productController.deleteProduct)

/* exporting routes */
module.exports = router


