var express = require('express');
var app = express();
var router = require('../controllers/routes.js')(express);
var setupPassport = require("../controllers/setupPassport.js")(app);
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var engine = require('consolidate');
var path = require("path");

var PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(session({ secret: 'supersecret', resave: false, saveUninitialized: false }));

//flashmessages
app.use(flash());
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//static
app.use("/public", express.static(path.join(__dirname,"..", "public")));

//views
app.set('views', path.join(__dirname, "..", "views"));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

// routes
app.use("/", router);

// launch
app.listen(PORT, () => {
    console.log("Server running on ", PORT);
});
