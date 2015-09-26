var app = angular.module('QueuePlate')

app.controller('dashboardCtrl', function($scope, $cookies) {
  
  $scope.customerView; 

   $scope.userName = $cookies.getObject("userName")
   $scope.lastName =  $cookies.getObject("lastName")
   $scope.role = $cookies.getObject("role")
   $scope.addLine1 = $cookies.getObject("addLine1")
   $scope.addLine2 = $cookies.getObject("addLine2")
   $scope.addCity = $cookies.getObject("addCity")
   $scope.addState = $cookies.getObject("addState")
   $scope.addZip = $cookies.getObject("addZip")
   $scope.phoneNumber = $cookies.getObject("phoneNumber")


  if($scope.role ="customer") {

    $scope.customerView = true;

  } else {

    $scope.customerView = false;
  }

}); 




