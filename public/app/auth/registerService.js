var app = angular.module('QueuePlate')

app.service('registerService', function($http, $q, $rootScope) {
	this.restData

	this.checkVerified = function(id) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/users/" + id
		}).then(function(response) {
			deferred.resolve(response.data)
		   })
		    return deferred.promise
		    console.log(deferred.promise)
	}

	this.register = function(user, UID) {
		var deferred = $q.defer()

		console.log(deferred)

		$http.put('/api/users/' + UID + '/pref', {
			firstName: user.firstName,
			lastName: user.lastName,
			age: user.age,
			gender: user.gender,
			addLine1: user.addLine1,
			addLine2: user.addLine2,
			addCity: user.addCity,
			addZip: user.addZip,
			addState: user.addState,
			phoneNumber: user.phoneNumber

		})
		.then(function(data) {
			console.log(data)
			deferred.resolve(data) 
			console.log(data)
		});

		return deferred.promise
		console.log()
	}

	this.checkVerifiedRestaurant = function(id) {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "/api/rests/" + id
		}).then(function(response) {
			deferred.resolve(response.data)
		})
		    return deferred.promise
		    console.log(deferred.promise)
    }

	this.registerRestaurant = function(rest, RID) {
		var deferred = $q.defer()

		$http.put('/api/rests/' + RID + '/pref', {
			name: rest.name,
			firstName: rest.firstName,
			lastName: rest.lastName,
			contactPhone: rest.contactPhone,
			addLine1: rest.addLine1,
			addLine2: rest.addLine2,
			addCity: rest.addCity,
			addZip: rest.addZip,
			addState: rest.addState,
			tables: rest.tables,
			businessEmail: rest.businessEmail, 
			stripeAccount: rest.stripeAccount,
			cuisine: rest.cuisine, 
			phoneNumber: rest.phoneNumber
			// cardNumber: cardNumber,
			// securityDigits: securityDigits,
			// dateOfExp: dateOfExp,

		})
		.then(function(data) {
			$http({
				method: "POST",
				url: '/api/rests/' + RID + '/menu'
			}).then(function(krang){
				console.log(krang)
			})
			deferred.resolve(data) //this passes everything back to controller
		});

		return deferred.promise
	}

})
