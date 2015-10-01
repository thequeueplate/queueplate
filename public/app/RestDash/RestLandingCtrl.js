var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $rootScope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData, orders){

  $scope.restData = restData

  $scope.goManage = function(){
    $state.go('ManageMenu')
  }
  $scope.name = $cookies.getObject("name")
  $scope.restFirst = $cookies.getObject("restFirstName");
  $scope.role = $cookies.getObject("restRole")
  $scope.lastName =  $cookies.getObject("lastName")
  $scope.role = $cookies.getObject("role")
  $scope.addLine1 = $cookies.getObject("addLine1")
  $scope.addLine2 = $cookies.getObject("addLine2")
  $scope.addCity = $cookies.getObject("addCity")
  $scope.addState = $cookies.getObject("addState")
  $scope.addZip = $cookies.getObject("addZip")
  $scope.phoneNumber = $cookies.getObject("phoneNumber")
  $scope.id = $cookies.getObject("userid")


  $scope.orders = orders;

  $scope.krang = "krang"

  $scope.selectedOrder = function(order) {
    restLandingService.setCurrentOrder(order)
      .then(function(response){
        $scope.currentOrder = restLandingService.currentOrder;
      })
        .then(function(){
          $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
        })
};


})
