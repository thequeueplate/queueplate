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

	api.post('/signup', function(req, res) {
		models.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(function(user){
			console.log('success hit')
			var validPassword = user.comparePassword(req.body.password);

			if(!validPassword) {
				res.send({message: 'Invalid Password'});
			} else {


			var token = createToken(user);
			console.log('successful login')

			var email = new sendgrid.Email({
			  to:       user.email,
			  from:     'queueplate.com@gmail.com',
			  subject:  'Welcome to QueuePlate!',
			  text:     'Click on the link to confirm your registration http://localhost:3000/verify/' + user._id
			});

			sendgrid.send(email, function(err, json) {
	  		if (err) { return console.error(err); }
	  		console.log(json);
			});

				var token = createToken(user);
				console.log('successful login')

				res.json({
					success: true, 
					message: "Successful login!",
					token: token
				})	 
			}
		}).catch(function(err) {
			res.send({message: "User not created", error: err});
			return;
		})
	});

	api.get('/users', function(req, res) {
		models.User.findAll()
		.then(function(users) {
			res.send(users);
		})
	});

	api.post('/login', function(req, res) {
		models.User.find({ where: { email: req.body.email }})
		.then(function(user) {
			var validPassword = user.comparePassword(req.body.password);
			console.log('login hit');

			if(!validPassword) {
				res.send({message: 'Invalid Password'});
			} else {

				var token = createToken(user);

				res.json({
					success: true, 
					message: "Successful login!",
					token: token
				})
			}
		}).catch(function(err) {
			res.send({message: "Can't login", error: err})
		})
	})
 	api.use(function(req, res, next) { //this middleware checks to see if user has token
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
	 
 	api.get('/me', function(req, res) {  //seperate api so we can fetch login user data. we can call it from the fron t end
		res.json(req.decoded); 

 	}); 
return api; 
}