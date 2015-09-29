var app = angular.module('QueuePlate')

app.service('discoverService', function($http, $q) {

	// this.restaurantsByCuisine = function() {
	// 	return $http.get('/api/rests', restaurants)
	// }

	this.restaurantsByName = function(restauraunts) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/rests"
		}).then(function(response) {
			deferred.resolve(response.data)
		   })
		    return deferred.promise
		    console.log(deferred.promise)
		    console.log(response)
	}

	this.addFavoriteRestaurant = function() {
		this.post('/api/users/:userid')
	}

	this.getMenu = function(restid) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/rests/" + restid
		}).then(function(response) {
			deferred.resolve(response.data)
		   })
		    return deferred.promise
		    console.log(deferred.promise)
		    console.log(response)
	}
});




// price range
// this.restaurantsByDistance = function() {
	// 	$http.get
	// }