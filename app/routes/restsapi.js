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
				console.log(err)
			}).catch(function(err) {
				res.send({message: "Restaurant not created error:", error: err});
				return;
			})
	});

	//RESTAURANT REGISTRATION - WIP
	api.put('/:restid/pref', function(req, res) {
        models.Restaurant.update(
	        	{
	        		name: req.body.name,
	        		firstName: req.body.firstName,
	        		lastName: req.body.lastName,
	        		addLine1: req.body.addLine1,
	        		addLine2: req.body.addLine2,
	        		addCity: req.body.addCity,
	        		addState: req.body.addState,
	        		addZip: req.body.addZip,
	        		businessEmail: req.body.businessEmail,
	        		contactPhone: req.body.contactPhone,
	        		phoneNumber: req.body.phoneNumber,
	        		stripeAccount: req.body.stripeAccount,
	        		tables: req.body.tables,
	        		verify: true,
	        		cuisine: req.body.cuisine,
	        		role: 'restaurant'
	        	},
	        	{ where: { id: req.params.restid}
        	})
        .then(function(rest) {
                res.json({message: "Restaurant preferences updated"})
            })
        })

	//RESTAURANT LOGIN
	// api.post('/login', function(req, res) {
	// 	models.Restaurant.find({ where: { email: req.body.email }})
	// 	.then(function(rest) {
	// 		var validPasswordRest = rest.comparePasswordRest(req.body.passwordRest);
	// 		console.log('login hit');

	// 		if(!validPasswordRest) {
	// 			console.log('not valid pw');
	// 			res.send({message: 'Invalid Password'});
	// 		} else {

	// 			var token = createToken(rest);

	// 			res.json({
	// 				success: true,
	// 				message: "Successful login!",
	// 				token: token,
	// 				id: rest.id
	// 			})
	// 		}
	// 		console.log(err)
	// 	}).catch(function(err) {
	// 		res.send({message: "Can't login error", err})
	// 		console.log(err)
	// 	})
	// })

	api.post('/login', function(req, res) {
		models.Restaurant.find({ where: { email: req.body.email }})
		.then(function(rest) {

			if (!rest.verify) {
				res.json({
					success: false,
					message: "Please check your email to confirm your account before login"
				})
			}

			var validPassword = rest.comparePassword(req.body.password);
			console.log('login hit');

			if(!validPassword) {
				console.log('not valid pw');
				res.send({message: 'Invalid Password'});
			} else {

				var token = createToken(rest);

				res.json({
					success: true,
					message: "Successful login!",
					token: token,
					id: rest.id,
					role: rest.role,
					firstName: rest.firstName,
					lastName: rest.lastName,
					verify: rest.verify,
					name: rest.name


				})
			}
		}).catch(function(err) {
			res.send({message: "Can't login error:", error: err})

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

	//CREATE MENU
    api.post('/:restid/menu', function(req, res) {
    	models.Menu.create({
    		RestaurantId: req.params.restid
    	}).then(function(menu) {
    		res.send(menu);
    	}).catch(function(err) {
    		res.send({message: 'Menu not created.', error: err});
    	})
    });

    //CREATE SECTION
    api.post('/:restid/sections/:menuid', function(req, res) {
    	models.Section.create({
    		RestaurantId: req.params.restid,
    		MenuId: req.params.menuid,
    		name: req.body.name,
    		comments: req.body.comments
    	}).then(function(section) {
    		res.send(section);
    	}).catch(function(err) {
    		res.send({message: 'Section not created', error: err});
    	})
    });

    api.put('/:restid')

    //CREATE MENUITEM
    api.post('/:restid/items/:sectionid', function(req,res) {
    	models.MenuItem.create({
    		RestaurantId: req.params.restid,
    		SectionId: req.params.sectionid,
    		name: req.body.name,
			description: req.body.description,
			price: req.body.price,
		}).then(function(item) {
			res.send(item);
		}).catch(function(err) {
			res.send({message: 'Item not created', error: err});
		})
    })

	//GET FULL MENU
	api.get('/:restid/menu', function(req, res) {
		models.Menu.findAll({
			where: { Restaurantid: req.params.restid },
			include: [
			{model: models.Section, include: [
				{model: models.MenuItem}]}
			]
		})
		.then(function(fullMenu) {
			res.send(fullMenu);
		}).catch(function(err) {
			res.send({message: 'Could not get menu.', error: err});
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
