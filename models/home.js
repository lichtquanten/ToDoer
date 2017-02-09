var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
}

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model("User", userSchema);
