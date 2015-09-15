var express = require('express'); 
var bodyParser = require('body-parser'); 
var morgan = require('morgan'); 


var config = require('./config');
var mongoose = require('mongoose'); //how you call your database
var app = express(); 


mongoose.connect(config.database, function(err) {
	if(err) {
		console.log(err);		
	} else {
		console.log('Connected to the database');
	}
}); 

///////     MIDDLEWARE     /////
app.use(bodyParser.urlencoded({ extended: true })); //extended makes it accept videos and photos and strings etc
app.use(bodyParser.json()); // in req.body etc, body stands for bodyparser
app.use(morgan('dev')); //will log all requests to the console

app.use(express.static(__dirname + '/public')); //middleware to render all of public files - anyfiles css or html will be rendered if we want to use one of them. if we dont put it then there is no way for index.html to render thethe files later on

var api = require('./app/routes/api')(app, express);
app.use('/api', api); // /api is the prefix in all api.js files files

app.get('*', function(req, res) { //the asterisk will make every url go to index.html
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Listening on port 3000");
	}
});