var app =  require('./../server.js');


module.exports = {

}

function encodeMessage(cipherWord, message) {

	var alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

	//Create the key from the cipher word
	var cipher = cipherWord.toUpperCase().split();

	for(var i = 0; i < alphabet.length; i++) {
		if(cipher.indexOf(alphabet[i]) === -1) {
			cipher.push(alphabet[i]);
		}
	}

	//Format message (Remove spaces, all caps)
	var messageClean  = message.replaceAll(/[^A-Za-z]/g,"").toUpperCase;


	//Convert message

}