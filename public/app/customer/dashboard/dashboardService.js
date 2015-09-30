var app = angular.module('QueuePlate')

app.service('dashboardService', function($http, $q) {

	this.UID; 

	this.setUID = function(UID) {
		this.UID = UID
	}

	this.FavDish = function(UID) {
		console.log("FDJLS:JFKLFKJSL:DJFL:SKDFJ:LSFJLS:KDFJL:", UID)

     var deferred = $q.defer();
		$http({
			method: "GET",
			url: 'api/orders/user/' + UID.id
		}).then(function(response) {
			deferred.resolve(response.data)
		})
		console.log(deferred.promise)
		return deferred.promise
	}
})

