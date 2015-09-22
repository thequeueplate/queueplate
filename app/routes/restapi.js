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

	api.post('/signup', function(req, res) {

		models.Restaurant.create({
			email: req.body.email,
			password: req.body.password
		}).then(function(rest){
			console.log('success hit')

				var email = new sendgrid.Email({
				  to:       'rspicer@razegroup.com',
				  from:     'queueplate.com@gmail.com',
				  subject:  'Welcome to QueuePlate!',
				  text:     'Click on the link to confirm your registration http://localhost:3000/registerCustomer/' + rest.restid 
				});

				// + rest.restidd

				sendgrid.send(email, function(err, json) {
			  		if (err) { 
			  			return console.error(err); 
			  		}
			  		
			  		// console.log("WHAT IS LINE 48???????????????", json);
				});

				var token = createToken(rest);
				console.log('successful login')

				res.json({
					success: true, 
					message: "Successful login!",
					token: token,
					restID: rest.restid
				})	 
			
		}).catch(function(err) {
			res.send({message: "Restaurant not created", error: err});
			return;
		})
	});

	api.put('/:restid/pref', function(req, res) {
		// console.log('REQ.BODY asldkfjaosdifjasdfojasdofjiasd', req.body)
        models.Restaurant.update(
	        	{
	        		verify: true
	        	}, 
	        	{ where: { restid: req.params.restid}
        	})
        // console.log("RES RES RES RES RES 12341892347192834", res.body)
        .then(function(rest) {
        	console.log("INSIDE FUNCTION!@#$!@#$")
            // rest.firstName = req.body.firstName;
            // rest.lastName = req.body.lastName;
            // rest.age = req.body.age;
            // rest.gender = req.body.gender;
            // rest.save().then(function(){
                res.json({message: "Restaurant preferences updated"})
            })
        })

	api.get('/', function(req, res) {
		models.Restaurant.findAll()
		.then(function(rests) {
			res.send(rests);
		})
	});


	api.get('/:restid', function(req, res) {
        models.Restaurant.find({ where: { restid: req.params.restid}})
        .then(function(rest) {
            res.send(rest);
        })
    });

	api.post('/login', function(req, res) {
		models.Restaurant.find({ where: { email: req.body.email }})
		.then(function(rest) {
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
					restID: rest.restid
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
 					res.status(403).send({ success: false, message: "Failed to authenticate restaurant" });
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


