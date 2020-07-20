/*====================================IMPORTING=============================*/
// importing packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// multer import
const path = require('path');
const multer = require('multer')

// importing custom authRouters
const authRoute = require('./routes/authRouter')
const productRoute = require('./routes/productRouter')
const cartRoute = require('./routes/cartRouter')

/*====================================SYSTEM INTEGRATION=============================*/
const app = express()
const PORT = process.env.PORT || 5001

/*====================================USE PACKAGES===================================*/
app.use(bodyParser.json())
app.use(cors())

/*====================================USE CUSTOM ROUTERS=============================*/

/* Multer Config */

// multer directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// multer setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// multer upload
const upload = multer({storage: storage, fileFilter: fileFilter});

// multer route
app.post('/upload-image', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'image uploaded successfully'
        });
    } catch (error) {
        console.error(error);
    }
})
/* Multer Config END */


// template config
app.set("view engine", "ejs")

// home route with template
app.get("/", (req, res) => res.render("home"));

// other api routes
app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);

/*====================================RUN SERVER===================================*/
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
// app.listen(PORT, () => {console.log('server is running on ', {PORT})})



