
var app = angular.module('QueuePlate')

app.service('RestaurantMenuService', function($http, $q) {

	this.RID; 

	this.setRID = function(RID) {
		this.RID = RID
	}
	
	this.getMenu = function(RID) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/rests/" + RID + "/Menu"
		}).then(function(response) {
			deferred.resolve(response.data)
		   })
		    return deferred.promise
		    console.log(deferred.promise)
	}
})