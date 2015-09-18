var app = angular.module('QueuePlate')

app.service('registerService', function($http, $q) {

	this.register = function(user) {
		var deferred = $q.defer()

		$http.post('/api/registerCustomer', {
			firstName: user.firstName, 
			lastName: user.lastName,
			age: user.age, 
			gender: user.gender,
			// street: street,
			// apt: apt, 
			// city: city, 
			zip: user.zip, 
			state: user.state, 
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
