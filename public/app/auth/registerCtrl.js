var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, registerService, $state, $window, $scope) {

$scope.registerUser = function() {


	registerService.register = function() {

	}
		$state.go('dashboard');
		
	}

})

// if($stateParams.password === user.password){
// 		    $scope.productData = productService.shoeData;
// 		  } else if ($stateParams.id === 'socks'){
// 		    $scope.productData = productService.sockData;
// 		  }

//$stateParams