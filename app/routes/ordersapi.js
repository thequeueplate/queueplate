var models = require('../models');

module.exports = function(app, express) {

	var api = express.Router();

	//CREATE NEW ORDER
	api.post('/user/:restid/:userid', function(req, res){
		models.Order.create({
			RestaurantId: req.params.restid,
			UserId: req.params.userid,
			status: req.body.status
		}).then(function(order) {
			res.send(order);
		}).catch(function(err){
			res.send({message: 'Order not created.', error: err})

		})
	})

	//UPDATE ORDER STATUS
	api.put('/order/:orderid', function(req, res) {
		models.Order.update({
			status: req.body.status
		},
		{where: { id: req.params.orderid }})
		.then(function(order) {
			res.send(order);
		}).catch(function(err) {
			res.send({message: 'Order status not updated', error: err});
		})
	})

	//CREATE NEW ORDER ITEM, BY ORDERID PASS IN ITEMID
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

	//FIND ALL ITEMS BY ITEMID - Probably not used
	api.get('/item/:itemid', function(req, res) {
		models.OrderItem.findAll({
			where: { id: req.params.itemid },
			include: [ models.MenuItem ]
		}).then(function(orderitem) {
			res.send(orderitem);
		}).catch(function(err){
			res.send({message: 'Could not find Order Item', error: err})
		})
	})

	//FIND ALL ORDERS BY RESTAURANT
	api.get('/rest/:restid', function(req, res) {
		models.Order.findAll({
			where: { RestaurantId: req.params.restid },
			include: [
			{model: models.OrderItem, include: [{
				model: models.MenuItem
			}]}]
		}).then(function(orders) {
			console.log(orders.getMenuItem)
			res.send(orders);
		}).catch(function(err) {
			res.send({message: 'Could not find orders', error: err})
		})
	})

	//FIND ALL ORDERS BY USER
	api.get('/user/:userid', function(req, res) {
		models.Order.findAll({
			where: { UserId: req.params.userid },
			include: [
			{model: models.OrderItem, include: [{
				model: models.MenuItem
			}]}]
		}).then(function(orders) {
			res.send(orders);
		}).catch(function(err) {
			res.send({message: 'Could not find orders', error: err})
		})
	})
	return api;
}
