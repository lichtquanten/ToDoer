var promise = require('bluebird'); // or any other Promise/A+ compatible library;

var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
var pgp = require("pg-promise")(options);
var db = pgp("postgres://ozcyttxyiqtrlf:241759d9f3af075a38cdfafdd91a027a7d2ec1400607d05ca47da8bbf4319d9c@ec2-54-204-0-88.compute-1.amazonaws.com:5432/dbkss0obe8ct8a?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory");
module.exports = db;
