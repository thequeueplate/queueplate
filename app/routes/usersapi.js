var config = require('../../config');
var SGKey = config.SG_API_KEY;
var sendgrid  = require('sendgrid')(SGKey)

var models  = require('../models');
var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

	var token = jsonwebtoken.sign({
		id: user._id,
		email: user.email
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {

	var api = express.Router();

	//USER SIGNUP
	api.post('/signup', function(req, res) {
		models.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function(user){
			console.log('success hit')
				var email = new sendgrid.Email({

				  to:       'lindseybrown4@gmail.com',
				  from:     'queueplate.com@gmail.com',
				  subject:  'Welcome to QueuePlate!',
				  text:     'Click on the link to confirm your registration http://localhost:3000/registerCustomer/' + user.id
				});

				sendgrid.send(email, function(err, json) {
			  		if (err) {
			  			return console.error(err);
			  		}
				});

				var token = createToken(user);
				console.log('successful login')

				res.json({
					success: true,
					message: "Successful login!",
					token: token,
					id: user.id
				})	 
		}).catch(function(err) {
			res.send({message: "User not created", error: err});
			return;
		})
	});

	//USER REGISTRATION
	api.put('/:userid/pref', function(req, res) {
        models.User.update(
	        {
	        	firstName: req.body.firstName,
	        	lastName: req.body.lastName,
	        	age: req.body.age,
	        	gender: req.body.gender,
	        	addLine1: req.body.addLine1,
	        	addLine2: req.body.addLine2,
	        	addCity: req.body.addCity,
	        	addState: req.body.addState,
	        	addZip: req.body.addZip,
	        	phoneNumber: req.body.phoneNumber,
	        	verify: true,
	        	role: 'customer'
	        },
	        	{ where: { id: req.params.userid}
        	})
        .then(function(user) {
            res.json({message: "User preferences updated"})
            })
        })

	//USER LOGIN
	api.post('/login', function(req, res) {
		models.User.find({ where: { email: req.body.email }})
		.then(function(user) {
			var validPassword = user.comparePassword(req.body.password);
			console.log('login hit');

			if(!validPassword) {
				console.log('not valid pw');
				res.send({message: 'Invalid Password'});
			} else {

				var token = createToken(user);

				res.json({
					success: true,
					message: "Successful login!",
					token: token,
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName

				})
			}
		}).catch(function(err) {
			res.send({message: "Can't login", error: err})
		})
	})

	//GET ALL USERS
	api.get('/', function(req, res) {
		models.User.findAll()
		.then(function(users) {
			res.send(users);
		})
	});

 	//GET SINGLE USER
	api.get('/:userid', function(req, res) {
        models.User.find({ where: { id: req.params.userid}})
        .then(function(users) {
            res.send(users);
        })
    });

	//MIDDLEWARE - CHECKS TOKENS
 	api.use(function(req, res, next) {
 		console.log("Somebody just came to our app!");
 		var token = req.body.token || req.params.token || req.headers['x-access-token'];
 		if(token) {
 			jsonwebtoken.verify(token, secretKey, function(err, decoded) {
				if(err) {
 					res.status(403).send({ success: false, message: "Failed to authenticate user" });
 				} else {
 					//
 					req.decoded = decoded;
 					next();
 				}
 			});
 		} else {
 			res.status(403).send({success: false, message: "No Token Provided" });
 		}
	});

 	//GET INDIVIDUAL USER FROM FRONTEND ??
 	api.get('/me', function(req, res) {
		res.json(req.decoded);
 	});
return api;
}
