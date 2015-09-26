var app = angular.module('QueuePlate')

app.controller('discoverCtrl', function(discoverService, $state) {

	this.restaurantsByCuisine = function() {
		$http.get('/api/')
	}

	this.restaurantsByName = function() {
		$http.get('/api/')
	}

	// this.restaurantsByDistance = function() {
	// 	$http.get
	// }

	this.addFavoriteRestaurant = function() {
		this.post('/api/')
	}

})