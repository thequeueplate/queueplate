var app = angular.module('QueuePlate')

app.service('registerService', function($http, $q, loginService) {


	this.checkVerified = function(id) {
		var deferred = $q.defer();
		$http({
			method: "GET", 
			url: "/api/users/" + id
		}).then(function(response) {
			deferred.resolve(response.data)
			console.log(response)
		})
		    return deferred.promise
	}

	this.register = function(user, UID) {
		loginService.user = user;
		var deferred = $q.defer()
		console.log(user)
		console.log(UID)

		$http.put('/api/users/' + UID + '/pref', {
			firstName: user.firstName, 
			lastName: user.lastName,
			age: user.age, 
			// gender: user.gender,
			// street: street,
			// apt: apt, 
			// city: city, 
			// zip: user.zip, 
			// state: user.state, 
			phone: user.phone
			// cardNumber: cardNumber, 
			// securityDigits: securityDigits, 
			// dateOfExp: dateOfExp, 
			
		})
		.then(function(data) {
			deferred.resolve(data) //this passes everything back to controller

		});
		
		return deferred.promise
	}

})
