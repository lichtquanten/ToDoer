var validator = require("validator");
var mod = require("../models/mod");
var passport;

module.exports.import = function(pport) {
  passport = pport;
}
module.exports.login = function(req, res, next) {
  console.log("Login attempt from:", req.body);
  var errors = getLoginErrors(req.body);

  if (errors.blank.length > 0 || errors.tooLong.length > 0  || errors.invalid.length > 0) {
      console.log("Login errors:", errors);
    return res.send({errors: errors});
  } else {
    passport.authenticate("local",  function(err, user, info) {
      if (err) {
        console.log("passport.authenticate error");
        return next(err);
      }
      if (!user) {
        errors.invalid.push("auth");
        errors.incorrectAuthMessage = info.message;
        console.log("Login errors:", errors);
        return res.send({errors: errors});
      }
      req.login(user, function(err) {
        if (err) return next(err);
        console.log("Login errors:", errors);
        return res.send({redirect: "/"});
        // return res.redirect("/");
      });
    })(req, res, next);
  }
}

module.exports.register = function(req, res, next) {
  console.log("Registration attempt from:", req.body);
  var errors = getRegisterErrors(req.body);

  if (errors.blank.length > 0 || errors.tooLong.length > 0 || errors.invalid.length > 0) {
  console.log("Login errors:", errors);
    return res.send({errors: errors});
  } else {
    mod.addUser(req.body, function(user) {
      if (!user) return;
      req.login(user, function(err) {
        if (err) return err;
        return res.send({redirect: "/"});
        // return res.redirect("/");
      });
    })
  }
}

function getLoginErrors(input) {
  var errors = {
    blank: [],
    tooLong: [],
    invalid: []
  };
  if (input.email.length == 0) {
   errors.blank.push("email");
  } else {
     if (!validator.isEmail(input.email)) {
       errors.invalid.push("email");
     }
     if (input.email.length > 50) {
      errors.tooLong.push("email");
      }
  }
  if (input.password.length == 0) {
   errors.blank.push("password");
 } else if (input.password.length > 50) {
    errors.tooLong.push("password");
  }
  return errors;
}

function getRegisterErrors(input) {
  var errors = getLoginErrors(input);
  if (input.name.length == 0) {
   errors.blank.push("name");
 } else if (input.name.length > 50) {
    errors.tooLong.push("name");
  }
  if (input.confirmPassword.length == 0) {
   errors.blank.push("confirmPassword");
 } else if (input.confirmPassword.length > 50) {
    errors.tooLong.push("confirmPassword");
  } else if (input.password != input.confirmPassword) {
    errors.invalid.push("confirmPassword");
  }
  return errors;
}
