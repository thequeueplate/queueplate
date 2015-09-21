var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, registerService, $state, $scope, loginService) {

	$scope.registerUser = function(user) {
		registerService.register(user).then(function(response) {
			console.log(response); 
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

// if($stateParams.userid === user.userid){
// 		    $scope.productData = productService.shoeData;
// 		  } else if ($stateParams.id === 'socks'){
// 		    $scope.productData = productService.sockData;
// 		  }


// $stateParams.id
