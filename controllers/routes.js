var auth = require("./auth");
var todo = require("./todo");
var mod = require("../models/mod");
var test = require("./test");

module.exports = function(express) {
    var router = express.Router();

    router.get('/', function(req, res) {
      if (req.user) {
        // res.redirect("/list");
        console.log(req.user);
        console.log("||--HIT--|| ---list");
        var appData = {
          name: req.user.name,
          todos: null
        }
        mod.getTodos(req.user.id, req.user.email, function(err, todos) {
          if (err) return res.send(err);
          appData.todos = todos;
          return res.render("list",  {appData: JSON.stringify(appData)});
        });
      } else {
        console.log("||--HIT--|| index");
        res.render('index');
      }
    });

    router.post('/login', auth.login);

    router.post('/register', auth.register);

    router.post('/addTodo', todo.addTodo);

    router.post('/deleteTodo', todo.deleteTodo);
    //
    router.post('/toggleTodo', todo.toggleTodo);

    router.get("/logout", function(req, res) {
      console.log("||--HIT--|| /logout");
      req.logout();
      res.redirect("/");
    });
    return router;
}

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.render("index");
}
