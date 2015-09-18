var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, registerService, $state, $window, $scope) {

$scope.registerUser = function() {


	registerService.register = function() {

	}
		$state.go('dashboard');
		
	}

})