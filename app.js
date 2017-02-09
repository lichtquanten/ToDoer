var express = require('express');
var app = express();

var engine = require('consolidate');

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

var PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")))
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

// routes
require('./config/routes.js')(app);

// launch
app.listen(PORT, () => {
    console.log("Server running on ", PORT);
});
