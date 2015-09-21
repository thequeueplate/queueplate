var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, publishData, customerId, registerService, $state, $scope, loginService) {
	console.log(publishData.userid)
	console.log(customerId)


	$scope.registerUser = function(user) {

		registerService.register(user, customerId).then(function(response) {		
			
			console.log(publishData.userid)
			$scope.customerData = response.data; 			
			$state.go('login');

		});	

			
	}


	// registerService.checkVerified(id)
	// 	.then(function(response) {
	// 		if (response.verify === true) {
	// 			$state.go('login')
	// 		} else {
	// 			$state.go('registerCustomer')
	// 		  }
	// 	})		 
});

// if ($stateParams.userid === user.userid){
// 		    $scope.productData = productService.shoeData;
// 		  } else if ($stateParams.id === $stateParams.id) {
// 		    $scope.productData = productService.sockData;
// 		  }


// $stateParams.id
