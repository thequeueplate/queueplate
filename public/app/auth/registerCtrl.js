var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, registerService, $state, $scope) {

$scope.registerUser = function(user) {

	registerService.register(user).then(function() {

//promise

	})
		$state.go('login');
		
	}

})

// if($stateParams.password === user.password){
// 		    $scope.productData = productService.shoeData;
// 		  } else if ($stateParams.id === 'socks'){
// 		    $scope.productData = productService.sockData;
// 		  }


// $stateParams.id