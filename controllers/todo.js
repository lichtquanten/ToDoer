var mod = require("../models/mod");
var validator = require("validator");

module.exports.addTodo = function(req, res, next) {
  console.log("ADDING TODO");
  console.log(req.body);
  var errors = getNewItemErrors(req.body);
  console.log(errors);
  console.log(req.user);
  if (!req.user) {
    return res.redirect("/");
  }
  if (errors.blank.length > 0 || errors.tooLong.length > 0  || errors.invalid.length > 0) {
    return res.send({errors: errors});
  } else {
    mod.addTodo(req.user.id, req.body, function(err) {
      if (err) return next(err);
      return res.send({redirect: "/"});
      // return res.redirect("/");
    });
  }
}


function getNewItemErrors(input) {
  var errors = {
    blank: [],
    tooLong: [],
    invalid: []
  };
  if (input.form_name.length == 0) {
    errors.blank.push("name");
  } else if (input.form_name.length > 50) {
    errors.tooLong.push("name");
  }
  if (input.form_description.length == 0) {
    errors.blank.push("description");
  } else if (input.form_description.length > 500) {
    errors.tooLong.push("name");
  }
  if (input.form_collaborator1.length > 0 && !validator.isEmail(input.form_collaborator1)) {
      errors.invalid.push("collaborator1");
  }
  if (input.form_collaborator2.length > 0 && !validator.isEmail(input.form_collaborator2)) {
      errors.invalid.push("collaborator2");
  }
  if (input.form_collaborator3.length > 0 && !validator.isEmail(input.form_collaborator3)) {
      errors.invalid.push("collaborator3");
  }
  return errors;
}

module.exports.deleteTodo = function(req, res, next) {
  mod.deleteTodo(req.body.id, function(err) {
    if (err) return next(err);
    return res.send({redirect: "/"});
  });
}

module.exports.toggleTodo = function(req, res, next) {
  console.log("TOGGGLING", req.body);
  console.log(req.body.currentCompleted == "true");
  mod.toggleTodo(req.body.id, (req.body.currentCompleted == "true"), function(err) {
    if (err) return next(err);
    return res.send({redirect: "/"});
  });
}
