var User = require('../models/user'); //we require it bc we will be manipulating it later 
var config = require('../../config'); // because we will need the secret Key in the next line

var secretKey = config.secretKey; 

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

	var token = jsonwebtoken.sign({
		id: user._id, 
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {

	var api = express.Router(); 

	api.post('/signup', function(req, res) {

		var user = new User ({
			name: req.body.name, 
			username: req.body.username,
			password: req.body.password
		});

		user.save(function(err) {
			console.log(err)
			if(err) {
				res.send({message: "user not created", error: err});
				return;
			}

			User.findOne({ 
			username: req.body.username

		}).select('name username password').exec(function(err, user) {
			if(err) throw err;

			if(!user) {

				res.send({ message: "User doesn't exist"});
			} else if(user) {

				var validPassword = user.comparePassword(req.body.password);
				
				if(!validPassword) {
					res.send({ message: "Invalid Password" });
				} else {

					var token = createToken(user);

					res.json({
						success: true, 
						message: "Successful login!",
						token: token
					});
 				}
 			}
 		});

			});
		});


	api.get('/users', function(req, res) {

		User.find({}, function(err, users) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(users);
		});
	});

	api.post('/login', function(req, res) {

		User.findOne({ 
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if(err) throw err;

			if(!user) {

				res.send({ message: "userService doesn't exist"});
			} else if(user) {

				var validPassword = user.comparePassword(req.body.password);
				
				if(!validPassword) {
					res.status(200).send({ message: "Invalid Password" });
				} else {

					var token = createToken(user);

					res.status(200).json({
						success: true, 
						message: "Successful login!",
						token: token
					});
 				}
 			}
 		});
 	});

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

return api 


}

