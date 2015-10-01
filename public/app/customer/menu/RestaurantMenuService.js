var app = angular.module('QueuePlate')

app.service('RestaurantMenuService', function($http, $q, $cookies) {

    this.UID = $cookies.getObject("userid")

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

	this.order = function(RID) {
		return $http.post('api/orders/user/' + RID + '/' + this.UID + '/', {
			status: "Placed"
		})

	}

	this.addToOrder = function(orderAmount, ITEMID, ORDERID) {
		console.log(orderAmount)
	    return $http.post('api/orders/item/' + ORDERID + '/' + ITEMID + '/', {
	    	quantity: orderAmount
	    })
    }
})

