/* importing custom Models */
const Cart = require('./../models').Cart


/* Controllers */
module.exports = {

    /* router.post('/cart', cartController.addToCart) */
    addToCart: (req, res) => {
        let {product_id, name, quantity, price} = req.body
        let {id} = req.user
        let user_id = id

        Cart.findOne({where: {user_id: user_id}})
            .then(cart => {
                if (cart) {
                    const cart_object = JSON.parse(cart.product)
                    let products = cart_object.products

                    for (i = 0; i < products.length; i++) {
                        if (products[i].product_id === product_id) {
                            if (quantity < 1) {
                                products.splice(i, 1)
                                return res.status(200).json({"message": "quantity is: 0"})
                            }
                            products[i].name = name
                            products[i].quantity = quantity
                            products[i].price = price
                        }// if
                    }// for

                    const found = products.some(el => el.product_id === product_id)
                    if (!found) products.push({product_id, name, quantity, price})

                    let cart_string = JSON.stringify(cart_object)

                    cart.update({product: cart_string})
                        .then(cart => {
                            return res.status(200).json({
                                "message": "updated",
                                "cart": cart
                            })
                        }).catch(error => {
                        return res.status(400).json({"error": error})
                    })
                }// if

                else {
                    let carts = {}
                    let products = []

                    products.push({product_id, name, quantity, price})
                    carts.products = products

                    let cart_str_obj = JSON.stringify(carts)

                    if (quantity < 1) {
                        return res.status(200).json({"message": "quantity is: 0"})
                    } else {
                        Cart.create({user_id: user_id, product: cart_str_obj})
                            .then(new_cart => {
                                return res.status(400).json({
                                    "message": "created",
                                    "cart": new_cart
                                })
                            }).catch(error => {
                            return res.status(400).json({"error": error})
                        })
                    }

                }// else

            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },// addToCart


    /*
    router.get('/cart/:id', cartController.cartGet)
    router.get('/cart', cartController.cartGet)
    */
    cartGet: async (req, res) => {
        /* GET */
        if (req.method === "GET") {

            /* single cart */
            if (req.params.id) {
                let id = req.params.id
                Cart.findOne({where: {id: id}})
                    .then(data => {
                        return res.status(200).json({
                            data
                        })
                    })
            }// if

            /* all cart */
            else {
                Cart.findAll({})
                    .then(data => {
                            return res.status(200).json({
                                data
                            })
                        }
                    )
            }// else
        }// if
    },// cartGet


    /* router.delete('/cart/:id', cartController.cartDelete) */
    cartDelete: (req, res) => {
        const id = req.params.id

        Cart.destroy({where: {id: id}})
            .then(cart => {
                return res.status(200).json({
                    "message": `${id} deleted`
                })
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },// cartDelete


    /* testing */
    /* router.post('/cart-test', cartController.testCart) */
    testCart: async (req, res) => {
        let {product_id, name, quantity, price} = req.body
        let cart_id_header = req.headers['cart_id']

        /* conversion */
        let carts = {}
        let products = []

        // object to string
        // products.push({product_id, name, quantity, price})
        // carts.products = products
        // let string_cart = JSON.stringify(carts)

        // string to object
        // let object_cart = JSON.parse(cart.product)
        // let produ
        // cts = object_cart.products
        // console.log('149', object_cart)

        if (cart_id_header) {
            console.log('153', cart_id_header)

            let obj = await Cart.findOne({where: {id: cart_id_header}})
            console.log('156', typeof obj.product, obj.product)

            // parsing
            let parsed_object = JSON.parse(obj.product)
            let products = parsed_object.products
            console.log('160', typeof products, products)

            // let products = cart_object.products

            // object to string
            // products.push(obj.product.product_id, obj.product.name, obj.product.quantity, obj.product.price)
            // carts.products = products
            // console.log('161', carts.products)

            // let string_cart = JSON.stringify(carts)
            // console.log('164', string_cart)
            //
            let cart = await Cart.update({product: products})
            console.log('174', cart)


            return res.status(200).json({
                "message": "cart updated",
                "cart_id": cart.id,
                "cart_data": cart.product
            })

        } else {
            let cart = await Cart.create({product: string_cart})
            console.log('169', {cart})
            return res.status(201).json({
                "message": "created",
                "cart_id": cart.id,
                "cart_data": cart.product
            })
        }

    }// testCart


}// main


