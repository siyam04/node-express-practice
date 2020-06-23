module.exports = {

    // product create, get, update (POST, GET)
    product: (req, res) => {
        /* POST */
        if (req.method === "POST") {
            console.log({req})

            let name = req.body.name
            let category = req.body.category
            let price = req.body.price
            let quantity = req.body.quantity

            res.status(201).json({"message": "created", name, category, price, quantity})
        }

        /* GET */
        if (req.method === "GET"){

            /* if ID */
            if (req.params.id){
                let id = req.params.id
                res.status(200).json({
                    "message": `product details ${id}`,
                })
            }

            /* if NOT ID */
            else {
                let name = req.body.name
                let category = req.body.category
                let price = req.body.price
                let quantity = req.body.quantity

                res.status(200).json({"message": "found", name, category, price, quantity})
            }
        }// main if

    },// main

}
