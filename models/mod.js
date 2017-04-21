var db = require("./db");
var bcrypt = require("bcryptjs");

module.exports.verify = function(email, password, done) {
  db.any("SELECT * FROM Person WHERE email=$1", [email])
  .then(function(data) {
    if (!data.length) {
      console.log("Email not found!");
      return done(null, false, { message: "Email not found." });
    } else {
      if (data[0].password_hash == password) {
        console.log("Correct email and password!");
        return done(null, data[0]);
      } else {
        console.log("Incorrect password!");
        return done(null, false, { message: "Incorrect password" });
      }
    }
  }).catch(function(err) {
    console.log("COULD NOT QUERY DB TO VERIFY");
  });
}

module.exports.addUser = function(input, cb) {
  db.one("INSERT INTO Person (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *", [input.name, input.email, input.password])
  .then(function(user) {
    console.log("USER FROM ADD PERSON IN MOD.jS");
    cb(user);
  }).catch(function(err) {
    cb(null);
  });
}

module.exports.getUserById = function(id, cb) {
  db.any("SELECT * FROM Person WHERE id=$1", [id])
  .then(function(data) {
    if (data.length) {
      cb(null, data[0]);
    } else {
      cb(null, "Error: ID not found.");
    }
  }).catch(function(err) {
    cb(err);
  });
}
