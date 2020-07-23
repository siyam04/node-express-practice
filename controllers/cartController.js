/*==================================== IMPORTING =============================*/
// custom models
const Cart = require('./../models').Cart

/*==================================== CONTROLLERS =============================*/
module.exports = {

    /* 8. Cart Create and Update (POST) */
    cartCreateUpdate: (req, res) => {
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
                            console.log('23', typeof quantity, products[i])
                            if (quantity < 1) {
                                console.log('25', products)
                                products[i] = {}
                                products.splice(i, 1)
                                return res.status(200).json({products})
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
                    }// else

                }// else

            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },// addToCart


    /*
    9. Cart List (GET)
    10. Cart Details (GET)
    */
    cartGet: (req, res) => {
        /* 9 */
        /* 10 */
        if (req.method === "GET") {
            if (req.params.id) {
                let id = req.params.id
                Cart.findOne({where: {id: id}})
                    .then(data => {
                        return res.status(200).json({
                            data
                        })
                    })
            }// if

            /* 10 */
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


    /* 11. Cart Delete (DELETE) */
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
    }// cartDelete

}// main