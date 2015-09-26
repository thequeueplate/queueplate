var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, $cookies) {
  
  $scope.customerView; 


	$scope.userName = $cookies.getObject("firstName");
  $scope.role = $cookies.getObject("role");

  if($scope.role ="customer") {

    $scope.customerView = true;

  } else {

    $scope.customerView = false;
  }

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


