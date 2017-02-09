var db = require("../app").db;
var User = require("./home");

module.exports.login = function(req,res) {
}

module.exports.register = function(req,res) {
  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: ""
  })
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save(function(err) {
    if (err) {
      throw err;
    }
    console.log("User with email "+req.body.email+"created!");
  })
  res.send("Created user account");
}

module.exports.returnUserData = function(req,res) {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user.fname] = user;
    });
    res.send(userMap);
  })
}
