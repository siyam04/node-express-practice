/* importing packages */
const bcrypt = require('bcrypt');

/* importing custom Models */
const User = require('./../models').User


/* Controllers */
module.exports = {

    /* router.post('/register', authController.register) (POST) */
    register : async (req, res) => {
        // api data
        let {username, password, email, first_name, last_name} = req.body

        // Synchronous Hashing
        let hash = bcrypt.hashSync(password, 10);

        // object creation
        let user = await User.create({username, password:hash, email, first_name, last_name})

        // Synchronous Password & Hash checking
        if(bcrypt.compareSync(password, hash)) {
            console.log(`Matched! PASSWORD: ${password} HASH: ${hash}`)
        } else {
            console.log("Not Matched")
        }

        // return response
        res.status(201).json({
            "data": user
        })


        // /* Asynchronous Hashing */
        // bcrypt.hash(password, 10, function(err, hash) {});
        //
        // // Asynchronous Password & Hash checking
        // bcrypt.compare(password, hash, function(err, result) {
        //     console.log(result)
        // });

    },


    /* router.post('/login', authController.login) (POST) */
    // login: (req, res) => {
    //     let username = req.body.username
    //     let password = req.body.password
    //
    //     if (username ===  this.register.username && password === this.register.password){
    //         res.status(200).json({"message": `login successful for ${username}`})
    //     }
    //     else {
    //         res.status(204).json({"message": `no content for ${username}`})
    //     }
    // },

    /* router.post('/logout', authController.logout) (POST) */
    // logout: (req, res) => {
    //     let username = req.body.username
    //     let Token = req.body.Token
    //
    //     res.status(200).json({"message": `${Token} matched! logout success for ${username}`})
    // },


}// main

