
var app = angular.module('QueuePlate')

app.service('RestaurantMenuService', function($http, $q) {

	this.RID; 
	this.UID; 

	this.setRID = function(RID) {
		this.RID = RID
	}

	this.setUID = function(UID) {
		this.UID = UID
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
	
	this.getRest = function(RID) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "api/rests/" + RID
		}).then(function(response) {
			deferred.resolve(response.data)
		})
		return deferred.promise
		console.log(deferred.promise)
	}

	this.order = function(RID, UID) {
		return $http.post('api/orders/user/' + RID + '/' + UID + '/', {
			status: "Placed"
		})

	}

	this.addToOrder = function( ORDERID, ITEMID) {
	    return $http.post('api/orders/item/' + ORDERID + '/' + ITEMID + '/')

    }
})