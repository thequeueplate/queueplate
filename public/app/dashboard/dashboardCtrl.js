var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, dashboardService, $cookies) {
	
	$scope.cookiesFirstName = $cookies.getObject("firstName");
	$scope.cookiesLastName = $cookies.getObject("lastName");
	console.log($scope.cookiesFirstName)

}); 









	
  // $scope.deliveryAddress = function(delivery) {
  //   // console.log(delivery);
  //   firstName= delivery.firstName,
  //   lastName= delivery.lastName,
  //   address= delivery.address,
  //   city= delivery.city,
  //   state= delivery.state,
  //   postalCode= delivery.postalCode
  // };


