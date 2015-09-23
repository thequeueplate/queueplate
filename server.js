var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var config = require('./config');
var stripe = require("stripe")("sk_test_GOrufKljADFLhu6YHA75r0AB");
var request = require('request');

var app = express();

///////     MIDDLEWARE     /////
app.use(bodyParser.urlencoded({ extended: true })); //extended makes it accept videos and photos and strings etc
app.use(bodyParser.json()); // in req.body etc, body stands for bodyparser
app.use(morgan('dev')); //will log all requests to the console

app.use(express.static(__dirname + '/public')); //middleware to render all of public files - anyfiles css or html will be rendered if we want to use one of them. if we dont put it then there is no way for index.html to render thethe files later on

var usersapi = require('./app/routes/usersapi')(app, express);
var restsapi = require('./app/routes/restsapi')(app, express);
app.use('/api/users', usersapi); // /api is the prefix in all api.js files files
app.use('/api/rests', restsapi);

app.get('*', function(req, res) { //the asterisk will make every url go to index.html
	res.sendFile(__dirname + '/public/index.html');
});

// app.post('/charge', function(req, res) {
//     var stripeToken = req.body.stripeToken;
//     var amount = 1000;

//     stripe.charges.create({
//         card: stripeToken,
//         currency: 'usd',
//         amount: amount
//     },
//     function(err, charge) {
//         if (err) {
//             res.send(500, err);
//         } else {
//             res.send(204);
//         }
//     });
// });

app.listen(config.port, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Listening on port 3000");
	}
});
