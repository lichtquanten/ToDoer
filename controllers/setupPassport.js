var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var authModels = require("../models/auth.js");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      authModels.verify(email, password, done.bind(this));
    }
  ));
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    var user = authModels.getUserById(id);
    console.log("DESERIALIZE");
    done(null, user)
  });
}

module.exports.passport = passport;
