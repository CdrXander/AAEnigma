var app =  require('./../server.js');


module.exports = {
	createMessage:createMessage
};

function createMessage(req,res) {
	var db = app.get('db');

	var messageEncoded = encodeMessage(req.body.cipher_word, req.body.message_plain);

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







function encodeMessage(cipherWord, message) {

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