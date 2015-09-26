var app = angular.module('QueuePlate')

app.service('signupService', function($http) {

	this.create = function(userData) {
		return $http.post('/api/users/signup', userData);
	}

	this.createRest = function(restData) {
		return $http.post('/api/rests/signup', restData);
	}

});
