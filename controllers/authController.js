/*==================================== IMPORTING =============================*/
// packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

// custom models
const User = require('./../models').User

/*==================================== CONTROLLERS =============================*/
module.exports = {

    /* 1. Registration (POST) // express-validator added */
    register: (req, res) => {

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

        // api data
        let {username, password, email, firstName, lastName} = req.body

        // synchronous hashing
        let hash = bcrypt.hashSync(password, 10)

        // object creation if username, email not exists
        User.findOne({where: {username: username}})
            .then(user => {
                if (!user) {
                    User.findOne({where: {email: email}})
                        .then(user => {
                            if (!user) {
                                User.create({username, password: hash, email, firstName, lastName})
                                    .then(user => {
                                        return res.status(201).json({
                                            "data": {
                                                "message": "user created",
                                                "type": "ok",
                                                "user": user
                                            }
                                        })
                                    }).catch(error => {
                                    return res.status(400).json({error})
                                })
                            }// if.
                            else {
                                return res.status(200).json({
                                    "data": {
                                        "message": "email already exists",
                                        "type": "ok",
                                    }
                                })
                            }// else
                        }).catch(error => {
                        return res.status(400).json({error})
                    })
                }// if
                else {
                    return res.status(200).json({
                        "data": {
                            "message": "username already exists",
                            "type": "ok",
                        }
                    })
                }// else

            }).catch(error => {
            return res.status(400).json({
                "data": {
                    "message": "something went wrong",
                    "type": "error",
                    "error": error
                }
            })
        })

        // synchronous password & hash checking
        // if(bcrypt.compareSync(password, hash)) {
        //     console.log(`Matched! PASSWORD: ${password} HASH: ${hash}`)
        // } else {
        //     console.log("Not Matched")
        // }

        // /* asynchronous hashing */
        // bcrypt.hash(password, 10, function(err, hash) {})
        //
        // // asynchronous password & hash checking
        // bcrypt.compare(password, hash, function(err, result) {
        //     console.log(result)
        // })

    },// register


    /* 2. Login (POST) // express-validator added */
    login: (req, res) => {

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

        let {email, password} = req.body

        User.findOne({where: {email: email}})
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const SECRET_KEY = 'RANDOM_SECRET_KEY'
                        // const token = jwt.sign(user.dataValues, SECRET_KEY, { expiresIn: '10s' })
                        const token = jwt.sign(user.dataValues, SECRET_KEY)

                        return res.status(200).json({
                            "data": {
                                "message": "login success",
                                "type": "ok",
                                "user": user,
                                "token": "Bearer " + token
                            }
                        })
                    }// if

                    else {
                        return res.status(200).json({
                            "data": {
                                "message": "password doesn't match",
                                "type": "ok",
                            }
                        })
                    }// else

                }// if

                else {
                    return res.status(200).json({
                        "data": {
                            "message": "email not matched",
                            "type": "ok",
                        }
                    })
                }// else

            }).catch(error => {
            return res.status(400).json({"error": error})
        })

    },// login


    /* router.post('/logout', authController.logout) (POST) */
    // logout: (req, res) => {
    //     let token = req.headers['authorization']

    // redis
    // jwtr.destroy(token)

    // return res.status(200).json({"message": "logout success"})

    // },// logout


}// main

