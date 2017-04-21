var passport = require("./setupPassport").passport;

module.exports.login = function(req, res, next) {
  var email = req.body.email, password = req.body.password;
  var errors = getLoginErrors(email, password);

  if (Object.keys(errors).length) {
    return res.send({errors: errors});
  } else {
    passport.authenticate("local", function(err, user, info) {
      console.log(err, user, info);
      if (err) {
        console.log("passport.authenticate error");
        return next(err);
      }
      if (!user) {
        return res.send({errors: {incorrectAuth: true, incorrectAuthMessage: info.message}});
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send({redirect: "/list"});
      });
    })(req, res, next);
  }
}

function getLoginErrors(email, password) {
  var errors = {};
  if (email.length == 0) {
   errors.emailBlank = true;
  } else {
     if (!testEmail(email)) {
       errors.emailInvalid = true;
     }
     if (email.length > 50) {
      errors.emailTooLong = true;
      }
  }
  if (password.length == 0) {
   errors.passwordBlank = true;
  } else if (password.length > 50) {
    errors.passwordTooLong = true;
  }
  return errors;
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

function testEmail(email) {
    if (!email) {
        return false;
    } else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return email;
    }
    return false;
}
