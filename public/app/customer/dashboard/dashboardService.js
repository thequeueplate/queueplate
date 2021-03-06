var app = angular.module('QueuePlate')

app.service('dashboardService', function($http, $q, $cookies) {

	this.UID = $cookies.getObject("userid")

	this.FavDish = function() {
     var deferred = $q.defer();
		$http({
			method: "GET",
			url: 'api/orders/user/' + this.UID
		}).then(function(response) {
			deferred.resolve(response.data)
		})
		console.log(deferred.promise)
		return deferred.promise
	}
})

