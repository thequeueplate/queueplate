var app = angular.module('QueuePlate')

app.controller('discoverCtrl', function(discoverService, $scope) {

	$scope.find = function() {

		discoverService.restaurantsByName($scope.restaurants)
			.then(function(response) {
			console.log(response)

			$scope.restaurants = response;

			})
	}

	$scope.takeToMenu = function() {

		





	}

})