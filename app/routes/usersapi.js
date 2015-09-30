var config = require('../../config');
var SGKey = config.SG_API_KEY;
var sendgrid  = require('sendgrid')(SGKey)

var models  = require('../models');
var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

	var token = jsonwebtoken.sign({
		id: user._id,
		email: user.email.toLowerCase()
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {

	var api = express.Router();

	//USER SIGNUP
	api.post('/signup', function(req, res) {

		//IF ADMIN...

		var adminArray = ['rspicer@razegroup.com', 'lindseybrown4@gmail.com','bunker.logan@gmail.com']
		if (adminArray.indexOf(req.body.email) !== -1) {
			models.User.create({
				email: req.body.email.toLowerCase(),
				password: req.body.password,
				role: 'admin'
			}).then(function(user){
			console.log('success hit')
				var email = new sendgrid.Email({

				  to:       'rspicer@razegroup.com',
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
		}
		//ELSE, IF REGULAR CUSTOMER...
		else {
		models.User.create({
			email: req.body.email.toLowerCase(),
			password: req.body.password,
			role: 'customer',
			verify: 'false'
		}).then(function(user){
			console.log('success hit')
				var email = new sendgrid.Email({

				  to:       'rspicer@razegroup.com',
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
					id: user.id,
					role: user.role,
					verify: user.verify
				})

		}).catch(function(err) {
			res.send({message: "User not created", error: err});
			return;
		})
	}
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
	        	verify: true
	        },
	        	{ where: { id: req.params.userid}
        	})
        .then(function(user) {
            res.json({message: "User preferences updated"})
            })
        })

	//USER LOGIN
	api.post('/login', function(req, res) {
		models.User.find({ where: { email: req.body.email.toLowerCase() }})
		.then(function(user) {

			if (!user.verify) {
				res.json({
					success: false,
					message: "Please check your email to confirm your account before login"
				})
			}
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
					lastName: user.lastName,
					verify: user.verify,
					role: user.role, 
					addLine1: user.addLine1, 
					addLine2: user.addLine2, 
					addCity: user.addCity, 
					addState: user.addState, 
					addZip: user.addZip,
					phoneNumber: user.phoneNumber

				})
			}
		}).catch(function(err) {
			res.send({message: "Can't login error:", error: err})
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

	//ADD NEW FAVORITE ORDER
	api.post('/fav/:userid/:orderid', function(req, res) {
		models.FavoriteOrder.create({
			UserId: req.params.userid
		}).then(function(fav) {
			models.Order.update({
				FavoriteOrderId: fav.id
			},{where: { id: req.params.orderid }}
			).then(function(order) {
				res.json(order);
			}).catch(function(err){
				res.send({message: 'Order not updated', error: err});
			})
			res.send(fav);
		}).catch(function(err) {
			res.send({message: 'Favorite order not posted', error: err});
		})
	})

	//FIND ALL FAVORITE ORDERS BY USERID
	api.get('/fav/:userid', function(req, res) {
		models.FavoriteOrder.findAll({
			where: { UserId: req.params.userid },
			include: [{model: models.Order, include: [{model: models.OrderItem, include: [{model: models.MenuItem}]}]}]
		}).then(function(fav) {
			res.send(fav);
		}).catch(function(err) {
			res.send({message: 'Favorites not found', error: err});
		})
	})

	//USER LOGOUT - DESTROY SESSION
	api.get('/auth/logout', function(req,res) {
		console.log(req.session);
		req.session.destroy();
		res.end();
	})

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
 					req.session.decoded = decoded;
 					next();
 				}
 			});
 		} else {
 			res.status(403).send({success: false, message: "No Token Provided" });
 		}
	});

 	//GET TOKEN/SESSION FOR CURRENT USER
 	api.get('/info/me', function(req, res) {
		res.json(req.session.decoded);
 	});
return api;
}
