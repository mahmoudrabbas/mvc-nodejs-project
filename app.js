const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const mysql = require('mysql');
const path = require('path');
require('dotenv').config()

const productsRoutes = require('./routes/products.js');

const PORT = process.env.PORT || 5000;


const app = express();

app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());


// home
app.get('/' , (req , res)=> {
    const getProducts = 'SELECT * FROM product';
    db.query(getProducts, (err, results) => {
        res.render("home.ejs", {title: "Home", products: results});
    })
})


// products
app.use('/products', productsRoutes)

const db = mysql.createConnection({
    host:"localhost",
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

db.connect(err => {
    if(err){
        throw err;
    } else {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        })
    }
})

global.db = db;

