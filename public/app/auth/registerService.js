var app = angular.module('QueuePlate')

	app.service('registerService', function($http) {

	this.register = function(userData) {

		return $http.put('api/register', userData)
			
		}
	}
