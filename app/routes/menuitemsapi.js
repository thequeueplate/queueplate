var models = require('../models');

module.exports = function(app, express) {

	var api = express.Router();

	//GET SINGLE ITEM
	api.get('/:itemid', function(req, res) {
		models.MenuItem.find({ where: { id: req.params.itemid }})
		.then(function(item) {
			res.send(item);
		})
	});

	//UPDATE SINGLE ITEM
	api.put('/:itemid', function(req, res) {
		models.MenuItem.update({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			section: req.body.section,
			comments: req.body.comments,
			pictureURL: req.body.pictureURL
		},
		{ where: { id: req.params.itemid }}
		)
	});
	return api;
}