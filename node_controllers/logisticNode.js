var app = require('./../server.js');

module.exports = {
    getAllCountries:getAllCountries,
    getAllBonuses:getAllBonuses,
    getBonusById:getBonusById,
    getAllCiphers: getAllCiphers
};


function getAllCountries(req, res) {
    var db = app.get('db');

    db.country.find({},function(err, countryList) {
        if(!err) {
            res.status(200).send(countryList);
        } else {
            res.status(500).send(err);
        }

    })
}

function getAllBonuses(req, res) {
    var db = app.get('db');

    db.bonus.find({},function(err, bonusList) {
        if(!err) {
            res.status(200).send(bonusList);
        } else {
            res.status(500).send(err);
        }
    })
}

function getBonusById(req, res) {
    var db = app.get('db');

    db.bonus.findOne(parseInt(req.params.id),function(err, bonus) {
        if(!err) {
            res.status(200).send(bonus);
        } else {
            res.status(500).send(err);
        }
    })
}

function getAllCiphers(req,res) {
    var db = app.get('db');

    db.cipher.find({}, function(err, cipherList) {
        if(!err) {
         res.status(200).send(cipherList);
        } else {
            res.status(500).send(err);
        }
    })

}
