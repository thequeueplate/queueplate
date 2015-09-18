var app = angular.module('QueuePlate')

app.controller('registerCtrl', function($rootScope, registerService, $state, $window, $scope) {

$scope.registerUser = function() {
		$scope.message = ''; 


		registerService.register()
	}








})