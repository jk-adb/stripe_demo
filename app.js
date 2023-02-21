const express = require('express');
const app = express();
const ejs = require('ejs');

var bodyParser = require("body-parser");

app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use("/admin", require("./admin.js"));

app.use("/", require("./store.js"));

app.listen(3000, () => console.log("Your store is running on http://localhost:3000"));

  