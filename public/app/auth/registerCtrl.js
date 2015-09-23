var app = angular.module('QueuePlate')

app.controller('registerCtrl', function(publishData, customerId, registerService, $state, $scope, loginService, $cookies) {

	// $scope.verifiyUserNow = $cookies.getObject("verify")

	// $scope.checkIfVerified = function() {

	// 	loginService.getUser(response) {
	// 		console.log(response)

	// 	}

	// }
	
	
	// registerService.checkVerified(id)
	// 	.then(function(response) {
	// 		if (response.verify === true) {
	// 			$state.go('login')
	// 		} else {
	// 			$state.go('registerCustomer')
	// 		  }
	// 	})

	$scope.registerUser = function(user) {

		registerService.register(user, customerId).then(function(response) {

			$scope.customerData = response.data;
			$state.go('login');

		});
	}



	$scope.genders = [
		{type: "Male"},
		{type: "Female"},
		{type: "N/A"}
	]

	$scope.states = [
		{type: "AL"},
		{type: "AK"},
		{type: "AZ"},
		{type: "AR"},
		{type: "CA"},
		{type: "CO"},
		{type: "CT"},
		{type: "DE"},
		{type: "DC"},
		{type: "FL"},
		{type: "GA"},
		{type: "HI"},
		{type: "ID"},
		{type: "IL"},
		{type: "IN"},
		{type: "IA"},
		{type: "KS"},
		{type: "KY"},
		{type: "LA"},
		{type: "ME"},
		{type: "MD"},
		{type: "MA"},
		{type: "MI"},
		{type: "MN"},
		{type: "MS"},
		{type: "MO"},
		{type: "MT"},
		{type: "NE"},
		{type: "NV"},
		{type: "NH"},
		{type: "NJ"},
		{type: "NM"},
		{type: "NY"},
		{type: "NC"},
		{type: "ND"},
		{type: "OH"},
		{type: "OK"},
		{type: "OR"},
		{type: "PA"},
		{type: "RI"},
		{type: "SC"},
		{type: "SD"},
		{type: "TN"},
		{type: "TX"},
		{type: "UT"},
		{type: "VT"},
		{type: "VA"},
		{type: "WA"},
		{type: "WV"},
		{type: "WI"},
		{type: "WY"}
	]


	// registerService.checkVerified(id)
	// 	.then(function(response) {
	// 		if (response.verify === true) {
	// 			$state.go('login')
	// 		} else {
	// 			$state.go('registerCustomer')
	// 		  }
	// 	})
});



// $stateParams.id
