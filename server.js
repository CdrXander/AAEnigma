var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var massive		= require('massive');

var port = 3000;

var app = express();
app.use(bodyParser.json());


//END POINTS


app.listen(port, function() {
  console.log("Started server on port", port);
});