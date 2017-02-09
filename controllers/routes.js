var auth = require("../models/auth")
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.post('/login', auth.login);

    app.post('/register', auth.register);

    app.post('/users', auth.returnUserData);
}
