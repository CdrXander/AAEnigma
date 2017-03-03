var app = require('./../server.js');

module.exports = {
    login:login,
    logout:logout
};


function login(req, res) {
    var db = app.get('db');

        var loginData = {
            username: req.body.username,
            password: req.body.password
        };

    db.account.find(loginData, function(err, result) {
        if(!err) {
            if(result.length < 1) {
                res.status(422).send("Incorrect Login Data");
            } else {
                delete result[0].password;
                req.session.currentUser = result[0];
               res.status(200).send(req.session.currentUser);
            }
        } else {
            res.status(500).send(err);
        }
    })
}

function logout(req,res) {
    req.session.currentUser = null;
    res.status(200).send("User Logged Out");
}
