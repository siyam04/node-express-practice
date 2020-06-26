/* importing packages */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// redis
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

/* importing custom Models */
const User = require('./../models').User


/* Controllers */
module.exports = {

    /* router.post('/register', authController.register) (POST) */
    register: (req, res) => {
        // api data
        let {username, password, email, first_name, last_name} = req.body

        // synchronous hashing
        let hash = bcrypt.hashSync(password, 10);

        // object creation if username, email not exists
        User.findOne({where: {username: username}})
            .then(user => {
                if (!user) {
                    User.findOne({where: {email: email}})
                        .then(user => {
                            if (!user) {
                                User.create({username, password: hash, email, first_name, last_name})
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
        // bcrypt.hash(password, 10, function(err, hash) {});
        //
        // // asynchronous password & hash checking
        // bcrypt.compare(password, hash, function(err, result) {
        //     console.log(result)
        // });

    },// register


    /* router.post('/login', authController.login) (POST) */
    login: (req, res) => {
        let {email, password} = req.body

        User.findOne({where: {email: email}})
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const SECRET_KEY = 'RANDOM_SECRET_KEY'
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
    logout: (req, res) => {
        let token = req.headers['authorization']

        jwtr.destroy(token)
            .then(t => {
                return res.status(200).json({
                    "message": t
                })
            })

        // return res.status(200).json({
        //     "data": {
        //         "message": "logout success",
        //         "type": "ok",
        //         "token": "Bearer " + token
        //     }
        // })

    },// logout


}// main

