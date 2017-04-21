var auth = require("./auth");
var authModels = require("../models/auth");
var test = require("./test");
var passport = require("./setupPassport").passport;

module.exports = function(express) {
    var router = express.Router();

    router.get('/', function(req, res) {
        res.render('index');
    });

    router.post('/login', auth.login);

    router.post('/register', auth.register);

    router.get("/list", isAuthenticated, function(req, res) {
      res.send("WELCOME TO THE AUTH LAND");
    });

    router.get("/meme", function(req, res) {
      console.log(req.user);
      res.send("WELCOME TO MEME LAND");
    });

    router.get("/byid/:id", function(req, res) {
      console.log(authModels.getUserById(parseInt(req.params.id)));
      res.send(JSON.stringify(authModels.getUserById(parseInt(req.params.id))));
    })
    return router;
}

function isAuthenticated(req, res, next) {
  // if (req.user && req.user.authenticated()) {
  //   console.log("NEXT");
  //   return next();
  // }
  console.log(req.user);
  if (req.user) {
    console.log("AUTHH:", req.user.authenticated);
  }
  console.log("REDIR");
}
