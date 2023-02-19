const express = require('express');
const app = express();
const ejs = require('ejs');
  
var nedb = require('nedb');
var db = {};
db.products = new nedb({
    filename: 'data/products.db'
});
db.transactions = new nedb({
    filename: 'data/transactions.db'
});
db.products.loadDatabase();
db.transactions.loadDatabase();

var bodyParser = require("body-parser");

app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/admin", require("./admin.js"));

app.use("/", require("./store.js"));

app.listen(3000);

  