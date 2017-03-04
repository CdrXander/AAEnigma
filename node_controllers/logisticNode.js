var app = require('./../server.js');

module.exports = {
    getAllCountries:getAllCountries,
    getAllStatuses:getAllStatuses,
    saveBonus:saveBonus,
    getAllBonuses:getAllBonuses,
    getBonusById:getBonusById,
    saveCipher:saveCipher,
    getAllCiphers: getAllCiphers,
    saveTask:saveTask,
    getAllTasks:getAllTasks
};

//Support functions
function handleReturn(method_name, err, result, res) {
    if(!err) {
        res.status(200).send(result);
    } else {
        console.log("Error in " + method_name);
        console.log(err);
        res.status(500).send(err);
    }
}


//End point functions
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

function getAllStatuses(req,res) {
    var db = app.get('db');

    db.message_status.find({}, function (err, statusList) {
        handleReturn("getAllStatuses", err, statusList, res);
    })
}


//This function handles both CREATE and UPDATE
function saveBonus(req, res) {
    var db = app.get('db');
    db.bonus.save(req.body, function(err, bonus) {
        handleReturn("saveBonus", err, bonus, res);
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

function useBonus(message_id) {
    var db = app.get('db');

    db.get_message_and_bonus([])
}

function saveCipher(req, res) {
    var db = app.get('db');
    db.cipher.save(req.body, function(err, cipher) {
        handleReturn("saveCipher", err, cipher, res);
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


function saveTask(req, res) {
    var db = app.get('db');
    db.task.save(req.body, function(err, task) {
        handleReturn("saveTask", err, task, res);
    });
}

function getAllTasks(req,res) {
    var db = app.get('db');
    db.get_all_tasks([], function(err, tasks) {
        handleReturn("getAllTasks",err,tasks,res);
    });
}