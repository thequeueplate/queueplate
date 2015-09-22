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

				var email = new sendgrid.Email({
				  to:       'markkeysor@gmail.com',
				  from:     'queueplate.com@gmail.com',
				  subject:  'Welcome to QueuePlate!',
				  text:     'Click on the link to confirm your registration http://localhost:3000/registerCustomer/' + user.userid
				});

				// + user.useridd

				sendgrid.send(email, function(err, json) {
			  		if (err) {
			  			return console.error(err);
			  		}

			  		// console.log("WHAT IS LINE 48???????????????", json);
				});

				var token = createToken(user);
				console.log('successful login')

				res.json({
					success: true,
					message: "Successful login!",
					token: token,
					userID: user.userid
				})

		}).catch(function(err) {
			res.send({message: "User not created", error: err});
			return;
		})
	});


	// api.put('/users/:userid/pref', function(req, res) {
	// 	console.log('REQ.BODY asldkfjaosdifjasdfojasdofjiasd', req.body)
 //        models.User.find({ where: { userid: req.params.userid}})
 //        .then(function(user) {
 //        	console.log("INSIDE FUNCTION!@#$!@#$")
 //            user.firstName = req.body.firstName;
 //            user.lastName = req.body.lastName;
 //            user.age = req.body.age;
 //            user.gender = req.body.gender;
 //            user.save().then(function(){
 //                res.json({message: "User preferences updated"})
 //            })
 //        })
 //    })

<<<<<<< HEAD
		// console.log('REQ.BODY asldkfjaosdifjasdfojasdofjiasd', req.body)
        models.User.update(
	        	{
	        		firstName: req.body.firstName,
	        		lastName: req.body.lastName,
	        		age: req.body.age,
	        		gender: req.body.gender,
	        		verify: true
	        	},
	        	{ where: { userid: req.params.userid}
        	})
        // console.log("RES RES RES RES RES 12341892347192834", res.body)

        models.User.update({
	        firstName: req.body.firstName,
	        lastName: req.body.lastName,
	        age: req.body.age,
	        gender: req.body.gender,
	        verify: true
	    },
	    { where: { userid: req.params.userid}}
	    )
        .then(function(user) {
            res.json({message: "User preferences updated"})

	api.put('/users/:userid/pref', function(req, res) {
		// console.log('REQ.BODY asldkfjaosdifjasdfojasdofjiasd', req.body)
        models.User.update(
	        	{
	        		firstName: req.body.firstName,
	        		lastName: req.body.lastName,
	        		age: req.body.age,
	        		gender: req.body.gender,
	        		verify: true
	        	},
	        	{ where: { userid: req.params.userid}
        	})
        // console.log("RES RES RES RES RES 12341892347192834", res.body)
        .then(function(user) {
        	console.log("INSIDE FUNCTION!@#$!@#$")
            // user.firstName = req.body.firstName;
            // user.lastName = req.body.lastName;
            // user.age = req.body.age;
            // user.gender = req.body.gender;
            // user.save().then(function(){
                res.json({message: "User preferences updated"})
            })
        })

	api.get('/users', function(req, res) {
		models.User.findAll()
		.then(function(users) {
			res.send(users);
		})
	});


	api.get('/users/:userid', function(req, res) {
        models.User.find({ where: { userid: req.params.userid}})
        .then(function(users) {
            res.send(users);
        })
    });

<<<<<<< HEAD
    api.put('/users/:userid/role', function(req, res) {
    	models.User.update({
	        role: 'customer'
	    },
	    { where: { userid: req.params.userid }}
	    )
        .then(function(user) {
            res.json({message: "User role updated"})
            })
        })

	api.put('/rest/:restid/role', function(req, res) {
    	models.Restaurant.update({
	        role: 'restaurant'
	    },
	    { where: { userid: req.params.userid }}
	    )
        .then(function(user) {
            res.json({message: "Restaurant role updated"})
            })
        })

=======
>>>>>>> 88d9611f6ffb367edea5f83fe7d56c0518e01bdd
	api.post('/users', function(req, res) {
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
					userID: user.userid
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

<<<<<<< HEAD
 	});
return api;
}
=======
 	});
return api;
}


>>>>>>> 88d9611f6ffb367edea5f83fe7d56c0518e01bdd
