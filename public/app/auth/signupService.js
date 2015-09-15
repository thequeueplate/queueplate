var app = angular.module('QueuePlate')

app.service('signupService', function($http) {

	var signupService = {};

	signupService.create = function(userData) {
		return $http.post('/api/signup', userData);
	}

	return signupService;

});