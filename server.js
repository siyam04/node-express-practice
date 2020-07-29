/*==================================== IMPORTING =============================*/
// packages
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

// custom authRouters
const authRoute = require('./routes/authRouter')
const cartRoute = require('./routes/cartRouter')
const productRoute = require('./routes/productRouter')
const categoryRoute = require('./routes/categoryRouter')

/*==================================== SYSTEM INTEGRATION =============================*/
const app = express()
const port = process.env.PORT || 5001

/*==================================== TEMPLATE CONFIG =============================*/
app.set("view engine", "ejs")

/*==================================== USE PACKAGES ===================================*/
// access-control-allow-origin
app.use(cors())

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/*==================================== IMAGE DIR CONFIG =============================*/
// route for static path of images directory
app.use("/images", express.static(__dirname + "/images"))

/*==================================== USE CUSTOM ROUTERS =============================*/
// api routes
app.use("/api", authRoute)
app.use("/api", cartRoute)
app.use("/api", productRoute)
app.use("/api", categoryRoute)

// home route with template
app.get("/", (req, res) => res.render("home"))

/*==================================== RUN SERVER ===================================*/
app.listen(port, () => console.log(`server is running at http://localhost:${port}`))

