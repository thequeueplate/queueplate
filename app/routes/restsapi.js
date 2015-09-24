var config = require('../../config');
var SGKey = config.SG_API_KEY;
var sendgrid  = require('sendgrid')(SGKey)

var models  = require('../models');
var secretKey = config.secretKey; 

var jsonwebtoken = require('jsonwebtoken');

function createToken(rest) {

	var token = jsonwebtoken.sign({
		id: rest._id, 
		email: rest.email
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express) {

	var api = express.Router(); 

	//RESTAURANT SIGNUP
	api.post('/signup', function(req, res) {
		models.Restaurant.create({
			email: req.body.email,
			password: req.body.passwordRest
		}).then(function(rest){
			console.log('success hit')
				var email = new sendgrid.Email({
				  to:       'lindseybrown4@gmail.com',
				  from:     'queueplate.com@gmail.com',
				  subject:  'Welcome to QueuePlate!',
				  text:     'Click on the link to confirm your registration http://localhost:3000/registerRestaurant/' + rest.id 
				});

				sendgrid.send(email, function(err, json) {
			  		if (err) { 
			  			return console.error(err); 
			  		}
				});

				var token = createToken(rest);
				console.log('successful login')

				res.json({
					success: true, 
					message: "Successful login!",
					token: token,
					id: rest.id
				})	 
			}).catch(function(err) {
				res.send({message: "Restaurant not created", error: err});
				return;
			})
	});

	//RESTAURANT REGISTRATION - WIP
	api.put('/:restid/pref', function(req, res) {
        models.Restaurant.update(
	        	{
	        		verify: true
	        	}, 
	        	{ where: { id: req.params.restid}
        	})
        .then(function(rest) {
                res.json({message: "Restaurant preferences updated"})
            })
        })

	//RESTAURANT LOGIN
	api.post('/login', function(req, res) {
		models.Restaurant.find({ where: { email: req.body.email }})
		.then(function(rest) {
			var validPasswordRest = rest.comparePasswordRest(req.body.passwordRest);
			console.log('login hit');

			if(!validPasswordRest) {
				console.log('not valid pw');
				res.send({message: 'Invalid Password'});
			} else {

				var token = createToken(rest);

				res.json({
					success: true, 
					message: "Successful login!",
					token: token, 
					id: rest.id
				})
			}
		}).catch(function(err) {
			res.send({message: "Can't login", error: err})
		})
	})
	//GET ALL RESTAURANTS
	api.get('/', function(req, res) {
		models.Restaurant.findAll()
		.then(function(rests) {
			res.send(rests);
		}).catch(function(err) {
			res.send(err)
		})
	});

	//GET SINGLE RESTAURANT
	api.get('/:restid', function(req, res) {
        models.Restaurant.find({ where: { id: req.params.restid}})
        .then(function(rest) {
            res.send(rest);
        })
    });

	//CREATE NEW MENU ITEM
    api.post('/:restid/menu', function(req, res) {
		models.MenuItem.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			section: req.body.section,
			comments: req.body.comments,
			Restaurantid: req.params.restid
		}).then(function(item) {
			console.log('item created');
		}).catch(function(err) {
			res.send({message: 'Item not created.', error: err});
			return;
		})
	});

	//GET FULL MENU
	api.get('/:restid/menu', function(req, res) {
		models.MenuItem.findAll({ where: { Restaurantid: req.params.restid }})
		.then(function(items) {
			res.send(items);
		})
	})

	//MIDDLEWARE - CHECKS TOKEN
 	api.use(function(req, res, next) {
 		console.log("Somebody just came to our app!"); 
 		var token = req.body.token || req.params.token || req.headers['x-access-token']; 
 		if(token) {
 			jsonwebtoken.verify(token, secretKey, function(err, decoded) {
				if(err) {
 					res.status(403).send({ success: false, message: "Failed to authenticate restaurant" });
 				} else {
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
		console.log(req)

 	}); 
return api; 
}
