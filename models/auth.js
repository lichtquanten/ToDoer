var db = require("./db");
var bcrypt = require("bcryptjs");

module.exports.checkLogin = function(email, password) {
  console.log("YO");

  db.one("SELECT password_hash FROM Person WHERE email=$1", [email])
  .then(data => {
    console.log("HERE THE THE DB RESULTS");
    console.log(data);
  }, error => {
    console.log(error);
  })
}

module.exports.verify = function(email, password, done) {
  db.any("SELECT * FROM Person WHERE email=$1", [email])
  .then(function(data) {
    if (!data.length) {
      console.log("Email not found!");
      done(null, false, { message: "Email not found." });
    } else {
      if (data[0].password_hash == password) {
        console.log("Correct email and password!");
        done(null, data[0]);
      } else {
        console.log("Incorrect password!");
        done(null, false, { message: "Incorrect password" });
      }
    }
  }, function(err) {
    console.log("COULD NOT QUERY DB TO VERIFY");
  })
}

module.exports.getUserById = function(id) {
  db.any("SELECT * FROM Person WHERE id=$1", [id])
  .then(function(data) {
    console.log("HEY", typeof(data[0]));
    if (!data.length) {
      return "error. user not found.";
    } else {
      return data[0];
    }
  }, function(err) {
    console.log("COULD NOT QUERY DB FOR USER ID");
  })
}
