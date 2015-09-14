var app = angular.module('QueuePlate')

app.service('signupService', function($http) {

	var signupService = {};

	signupService.create = function(userData) {
		return $http.post('/api/signup', userData);
	}


//??
	// signupService.all = function() {
	// 	return $http.get('/api/users');
	// }
//??

	return signupService;

});