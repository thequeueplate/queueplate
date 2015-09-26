var models = require('../models');

module.exports = function(app, express) {

	var api = express.Router();

	//GET SINGLE ITEM


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
