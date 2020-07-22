/*==================================== IMPORTING =============================*/
// packages
const fs = require('fs')
const {validationResult} = require('express-validator')

// custom models
const Products = require('./../models').Products

/*==================================== CONTROLLERS =============================*/
module.exports = {
    /*
    3. Create Product (POST) // express-validator added
    4. Product List (GET)
    5. Product Details (GET)
    */
    product: async (req, res, next) => {
        /* 3 */
        if (req.method === "POST") {
            try {
                // express-validator
                const errors = validationResult(req)

                if (!errors.isEmpty()) {
                    let error_list = {}
                    errors.errors.forEach(error => {
                        error_list[error.param] = {
                            "value": error.value,
                            "msg": error.msg
                        }
                    })
                    return res.status(422).json({"errors": error_list})
                }
                // express-validator END

                let {name, category, price, quantity, imageUrl, description} = req.body

                // to declare some path to store my converted image
                const path = 'images/' + Date.now() + '.png'

                // to convert base64 format into random filename
                const base64Data = imageUrl.replace(/^data:([A-Za-z-+/]+);base64,/, '')

                // decoding
                fs.writeFileSync(path, base64Data, {encoding: 'base64'})

                // generating server paths for image
                let localServerPath = req.protocol + '://' + req.get('host') + '/' + path
                let herokuServerPath = 'https://nodejs-backend-apis.herokuapp.com/' + path

                // creating object
                let product = await Products.create({
                    name, category, price, quantity, imageUrl: herokuServerPath, description
                })

                // response
                return res.status(201).json({
                    "data": product
                })

            } catch (e) {
                next(e)
            }
        }// if

        /* 4 */
        /* 5 */
        if (req.method === "GET") {

            /* 4 */
            if (req.params.id) {
                let id = req.params.id
                // returns array
                // Products.findAll({where: {id: id}}).then(data => {return res.status(200).json({data})})

                // returns object
                Products.findOne({where: {id: id}})
                    .then(data => {
                        return res.status(200).json({
                            data
                        })
                    })
            }

            /* 5 */
            else {
                Products.findAll({})
                    .then(data => {
                            return res.status(200).json({
                                data
                            })
                        }
                    )
            }
        }// if
    },// product


    /* async await */
    /* 6. Edit Product (PUT) // express-validator added */
    // updateProduct: async (req, res) => {
    //     let id = req.params.id
    //     let {name, category, price, quantity} = req.body
    //
    //     let product = await Products.findOne({where: {id: id}})
    //
    //     product.update({name, category, price, quantity})
    //         .then(data => {
    //             return res.status(201).json({
    //                 data
    //             })
    //         })
    // },


    /* promise */
    /* 6. Edit Product (PUT) // express-validator added */
    updateProduct: (req, res) => {

        // express-validator
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            let error_list = {}
            errors.errors.forEach(error => {
                error_list[error.param] = {
                    "value": error.value,
                    "msg": error.msg
                }
            })
            return res.status(422).json({"errors": error_list})
        }
        // express-validator END

        let id = req.params.id
        let {name, category, price, quantity, imageUrl, description} = req.body

        Products.findOne({where: {id: id}})
            .then(product_obj_arg => {
                product_obj_arg.update({name, category, price, quantity, imageUrl, description})
                    .then(product_obj_arg_2 => {
                        return res.status(201).json({
                            data: product_obj_arg_2
                        })
                    }).catch(error_inner_then => {
                    return res.status(204).json({error_inner_then})
                })
            }).catch(error_outer_then => {
            return res.status(204).json({error_outer_then})
        })

    }, // updateProduct


    /* 7. Delete Product (DELETE) */
    deleteProduct: (req, res) => {
        const id = req.params.id

        Products.destroy({where: {id: id}})
            .then(product => {
                return res.status(200).json({
                    "message": `${id} deleted`
                })
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    }// deleteProduct

}// main


