var models = require('../models');

module.exports = function(app, express) {

	var api = express.Router();

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
		).then(function(item) {
			res.send(item);
		}).catch(function(err){
			res.send({message: "Menu Item not updated.", error: err})
		})
	});

	//UPDATE MENUITEM PICTURE
	api.put('/pic/:itemid', function(req, res) {
		models.MenuItem.update({
			pictureURL: req.body.pictureURL
		},
		{ where: { id: req.params.itemid }}
		).then(function(item) {
			res.send(item);
		}).catch(function(err){
			res.send({message: "Menu Item not updated.", error: err})
		})
	});
	return api;
}
