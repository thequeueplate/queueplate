var models = require('../models');

module.exports = function(app, express) {
	api.post('/', function(req, res) {
		models.MenuItem.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			section: req.body.section,
			comments: req.body.comments
		}).then(function(item) {
			console.log('item created');
		}).catch(function(err) {
			res.send({message: 'Item not created.', error: err});
			return;
		})
	});
	api.get('/menu/:restid', function(req, res) {
		models.MenuItem.findAll({ where: { RestaurantRestid: req.params.restid }})
		.then(function(items) {
			res.send(items);
		})
	})
	api.get('/:itemid', function(req, res) {
		models.MenuItem.find({ where: { itemid: req.params.itemid }})
		.then(function(item) {
			res.send(item);
		})
	});
	api.put('/:itemid', function(req, res) {
		models.MenuItem.update({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			section: req.body.section,
			comments: req.body.comments,
			pictureURL: req.body.pictureURL
		},
		{ where: { itemid: req.params.itemid }}
		)
	});
}