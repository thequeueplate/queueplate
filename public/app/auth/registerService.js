var app = angular.module('QueuePlate')

app.service('registerService', function($http, $q) {

	this.register = function(user) {
		var deferred = $q.defer()

		$http.post('/api/registerCustomer', {
			firstName: firstName, 
			lastName: lastName,
			age: age, 
			gender: gender,
			// street: street,
			// apt: apt, 
			// city: city, 
			zip: zip, 
			state: state, 
			phone: phone
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
