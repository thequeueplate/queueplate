var app = angular.module('QueuePlate')

app.service('dashboardService', function($http, $q) {

	this.getFavDishes = function(uid) {
		return $http.get('/api/users/:userid/', user);
	}

	this.addFavDish = function(dish) {
		return $http.post('/api/users/:userid/', dish);
	}

	this.editFavDish = function(dish) {
		return $http.put('/api/users/signup', dish);
	}

	this.deleteFavPlate = function(dish) {
		return $http.delete('/api/rests/signup', dish); 
	}

	this.addToOrder = function(dish) {
		return $http.post('/api/rests/signup', dish); 
	}

	this.deleteOrder = function(order) {
		return $http.delete('/api/rests/signup', order); 
	}

})


