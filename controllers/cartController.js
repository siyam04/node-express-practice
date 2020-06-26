/* importing custom Models */
const Cart = require('./../models').Cart


/* Controllers */
module.exports = {
    /*
    router.post('/cart', cartController.addToCart)
    router.put('/cart/:id', cartController.cartUpdate)
    */

    addToCart: async (req, res) => {
        let cart = await Cart.create(req.body)
        return res.status(201).json({"data": cart})
    },// addToCart


    // addToCart: (req, res) => {
    //     let {user_id, product_id} = req.body;
    //
    //     Cart.findOne({where: {user_id: user_id}})
    //         .then(cart => {
    //             if (cart) {
    //                 console.log("13", {cart})
    //                 let product_ids = cart.dataValues.product_id
    //                 product_ids = product_ids.split(',')
    //                 product_ids = product_ids.push(product_id)
    //
    //                 product_ids = product_ids.join(',')
    //                 console.log("19", {product_ids})
    //
    //                 Cart.update({product_id: product_ids}, {where: {user_id: user_id}})
    //                     .then(cart => {
    //                         return res.status(200).json({
    //                             "cart": cart
    //                         })
    //                     })
    //             }//if
    //
    //             else {
    //                 Cart.create({user_id, product_id})
    //                     .then(cart => {
    //                         return res.status(200).json({
    //                             "cart": " cart added!"
    //
    //                         })
    //
    //                     })
    //
    //             }
    //         }).catch(error => {
    //         return res.status(400).json({"error": error})
    //     })
    // },// addToCart


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


    /* router.put('/cart/:id', cartController.cartUpdate) */
    cartUpdate: (req, res) => {
        let id = req.params.id
        let {user_id, product_id} = req.body

        Cart.findOne({where: {id: id}})
            .then(cart => {
                cart.update({user_id, product_id})
                    .then(cart => {
                        return res.status(201).json({
                            data: cart
                        })
                    }).catch(error => {return res.status(204).json({error})
                })
            }).catch(error => {return res.status(204).json({error})
        })
    },// cartUpdate


    /* router.delete('/cart/:id', cartController.cartDelete) */
    cartDelete: (req, res) => {
        const id = req.params.id

        Cart.destroy({where: {id: id}})
            .then(cart => {
                return res.status(200).json({
                    "message": `${id} deleted`
                })
            }).catch(error => {return res.status(400).json({"error": error})
        })
    }// cartDelete



}// main


