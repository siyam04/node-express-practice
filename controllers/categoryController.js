/*==================================== IMPORTING =============================*/
// custom models
const Category = require('./../models').Category

/*==================================== CONTROLLERS =============================*/
module.exports = {
    /* 1. Category List (GET) */
    category: async (req, res) => {
        Category.findAll({})
            .then(data => {
                    return res.status(200).json({data})
                }
            )

    },// category

}// main
