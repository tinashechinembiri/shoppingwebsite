var express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const Product  = require('./Models/Product');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');
const cart = require('./Resrcart');

const port = 8020;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://mongo:test1@practiceone-shard-00-00-vcfvo.gcp.mongodb.net:27017,practiceone-shard-00-01-vcfvo.gcp.mongodb.net:27017,practiceone-shard-00-02-vcfvo.gcp.mongodb.net:27017/test?ssl=true&replicaSet=practiceone-shard-0&authSource=admin&retryWrites=true',
    {
        useMongoClient:true
    });

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
});

app.use('/',db)
app.use('/', cart)


app.listen(port, ()=> console.log('8020 check the data '))