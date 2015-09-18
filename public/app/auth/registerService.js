var app = angular.module('QueuePlate')

app.service('registerService', function($http) {

	this.register = function(userData) {

		return $http.post('/api/registerCustomer', {
			firstName: firstName, 
			lastName: lastName,
			age: age, 
			gender: gender,
			street: street,
			apt: apt, 
			city: city, 
			zip: zip, 
			state: state, 
			phone: phone, 
			cardNumber: cardNumber, 
			securityDigits: securityDigits, 
			dateOfExp: dateOfExp, 
			foodAllergies: foodAllergies

		});
	}
})
