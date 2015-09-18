var app = angular.module('QueuePlate')

app.service('signupService', function($http) {


	this.create = function(userData) {
		return $http.post('/api/signup', userData);
	}

});