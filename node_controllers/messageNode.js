var app =  require('./../server.js');


module.exports = {
	createMessage:createMessage,
    encodeMessage:encodeMessage,
	guessCipherForMessage:guessCipherForMessage,
	counterMessage:counterMessage,
    getMessageFullById:getMessageFullById,
    getMessageLimitedById:getMessageLimitedById,
	getEncoderMessageList:getEncoderMessageList,
	getDecoderMessageList:getDecoderMessageList,
	getAdminMessageList:getAdminMessageList,
	updateMessageStatus:updateMessageStatus
};

function createMessage(req,res) {
	var db = app.get('db');

	var messageEncoded = enigmaAlgorithm(req.body.cipher_word, req.body.message_plain);

	var newMessage = {
		country_id:req.body.country_id,
		bonus_id:req.body.bonus_id,
		cipher_id:req.body.cipher_id,
		message_status_id:1,
		message_plain:req.body.message_plain,
		message_encoded:messageEncoded,
		guessed:false,
		create_time: new Date()
	};

	db.message.insert(newMessage, function(err, message) {
		if(!err) {
			res.status(200).send(message);
		} else {
            res.status(500).send(err);
        }
	})
}

function encodeMessage(req,res) {
    var encodedMessage = enigmaAlgorithm(req.body.cipher_word, req.body.message_plain);
    res.status(200).send(encodedMessage);
}

function guessCipherForMessage(req, res) {
	var db = app.get('db');

	db.message.findOne(parseInt(req.body.message_id), function(err, message) {
		if(!err) {
            db.message.update({id:req.body.message_id, guessed:true}, function(err, updatedMsg) {
            	if(!err) {
                    if(message.cipher_id == req.body.guessed_cipher_id) {
						db.message.update({id:req.body.message_id,message_status_id:2}, function(err, response) {
							if(!err) {
                                res.status(200).send({guess:true});
                            } else {
                                console.log("Error in guessCipherForMessage");
                                console.log(err);
                                res.status(500).send(err);
                            }
						})
                    } else {
                    	res.status(200).send({guess:false});
					}
				} else {
                    console.log("Error in guessCipherForMessage");
                    console.log(err);
                    res.status(500).send(err);
				}
			})
		} else {
            console.log("Error in guessCipherForMessage");
            console.log(err);
            res.status(500).send(err);
        }
	})
}

function counterMessage(req, res) {
	var db = app.get('db');

	db.message.update({id:req.body.message_id, message_status_id:3}, function(err, response) {
		handleReturn("counterMessage", err, {}, res);
	})
}

function getMessageFullById(req,res) {
    var db = app.get('db');

    db.get_full_message_by_id([parseInt(req.params.id)], function(err, message) {
        if(!err) {
            res.status(200).send(message[0]);
        } else {
            res.status(500).send(err);
        }
    })
}

function getMessageLimitedById(req, res) {
	var db = app.get('db');

	db.get_encoded_message_by_id([parseInt(req.params.id)], function(err, message) {
		handleReturn("getEncoderLimitedMessageById", err, message, res);
	})
}

function getEncoderMessageList(req,res) {
    var db = app.get('db');
 	 db.get_encoder_message_list([req.session.currentUser.team_id], function(err, messageList) {
 	 	handleReturn("getEncoderMessageList", err, messageList, res);
	 })
}

function getDecoderMessageList(req, res) {
	var db = app.get('db');

	db.get_decoder_message_list([req.session.currentUser.team_id], function(err, messageList) {
		handleReturn("getDecoderMessageList",err,messageList,res);
	})
}

function getAdminMessageList(req,res) {
	var db = app.get('db');

	db.get_admin_message_list([], function(err, messageList) {
		handleReturn("getAdminMessageList", err, messageList, res);
	})
}

function updateMessageStatus(req,res) {
	var db = app.get('db');

	var data = {
		id:req.body.message_id,
		message_status_id:req.body.new_status_id
	};

	db.message.update(data, function(err, updatedMessage) {
		handleReturn("updateMessageStatus", err, updatedMessage, res);
	})
}





//Private support function

function enigmaAlgorithm(cipherWord, message) {

	var alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

	//Create the key from the cipher word
	var cipher = cipherWord.toUpperCase().split('');

	for(var i = 0; i < alphabet.length; i++) {
		if(cipher.indexOf(alphabet[i]) === -1) {
			cipher.push(alphabet[i]);
		}
	}

	//Format message (Remove spaces, all caps)
    var messageClean  = message.replace(/[^A-Za-z]+/g,"").toUpperCase().split('');

	//Convert message

	var messageEncoded = [];
	for(var j = 0; j < messageClean.length; j++) {
		if(j!== 0 && j%5 === 0) {
			messageEncoded.push(' ');
		}
		messageEncoded.push(cipher[alphabet.indexOf(messageClean[j])]);
	}
	messageEncoded = messageEncoded.join('');
	return messageEncoded;
}

function handleReturn(method_name, err, result, res) {
    if(!err) {
        res.status(200).send(result);
    } else {
    	console.log("Error in " + method_name);
    	console.log(err);
        res.status(500).send(err);
    }
}