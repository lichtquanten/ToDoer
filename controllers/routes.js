var auth = require("./auth");
var mod = require("../models/mod");
var test = require("./test");

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

    router.get("/yo", isAuthenticated, function(req, res) {
      res.send("HEY" + JSON.stringify(req.user) + "YEET");
    });

    router.get("/byid/:id", function(req, res) {
      mod.getPersonById(parseInt(req.params.id), function(result) {
        res.send(result);
      });
    });

    router.get("/logout", function(req, res) {
      req.logout();
      res.redirect("/");
    });
    return router;
}

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect("/");
}
