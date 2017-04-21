var LocalStrategy = require("passport-local").Strategy;
var mod = require("../models/mod.js");

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    mod.verify
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    mod.getUserById(id, function(err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, user);
      } else {
        console.log("FAILED DESERIALIZE");
        return done(null, false);
      }
    });
  });
}
