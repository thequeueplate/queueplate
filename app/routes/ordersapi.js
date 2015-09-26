var models = require('../models');

module.exports = function(app, express) {

	var api = express.Router();

	api.post('/item/:orderid/:itemid', function(req, res) {
		models.OrderItem.create({
			MenuItemId: req.params.itemid,
			OrderId: req.params.orderid,
			quantity: req.body.quantity,
			comments: req.body.comments
		}).then(function(orderitem) {
			res.send(orderitem);
		}).catch(function(err) {
			res.send({message: 'Could not create Order Item.', error: err});
		})
	})

	api.get('/item/:itemid', function(req, res) {
		models.OrderItem.findAll({
			where: { id: req.params.itemid },
			include: [
			{model: models.MenuItem}]
		}).then(function(orderitem) {
			res.send(orderitem);
		}).catch(function(err){
			res.send({message: 'Could not find Order Item', error: err})
		})
	})

	api.post('/rest/:restid/:userid', function(req, res){
		models.Order.create({
			RestaurantId: req.params.restid,
			UserId: req.params.userid,
			status: req.body.status
		})
	})

	api.get('/rest/:restid', function(req, res) {
		models.Order.findAll({
			where: { RestaurantId: req.params.restid },
			include: [
			{model: models.OrderItem}, {model: models.User}]
		}).then(function(orders) {
			res.send(orders);
		}).catch(function(err) {
			res.send({message: 'Could not find orders', error: err})
		})
	})

	api.get('/user/:userid', function(req, res) {
		models.Order.findAll({
			where: { UserId: req.params.userid },
			include: [
			{model: models.OrderItem}, {model: models.Restaurant}]
		}).then(function(orders) {
			res.send(orders);
		}).catch(function(err) {
			res.send({message: 'Could not find orders', error: err})
		})
	})
	return api;
}
