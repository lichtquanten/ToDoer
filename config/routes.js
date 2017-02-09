var authenticate = require("../controllers/authenticate")
module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
        console.log("Recieved GET request at /");
    });

    app.post('/login', authenticate.login);

    app.post('/register', authenticate.register);
}
