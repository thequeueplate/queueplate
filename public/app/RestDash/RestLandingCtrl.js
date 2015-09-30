var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData, orders){
  console.log("THIS REST IS THE BEST",restData);
  console.log("ORDERS ORDASDFIPOJ", orders);
<<<<<<< HEAD

  $scope.incomingOrders = orders;

=======
>>>>>>> 692517e3fcd3d8eed2658e9b89c2cd2e4cb2a8ca
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
    console.log("ORDER ORDER ORDER ORDER", order)
    restLandingService.setCurrentOrder(order)
      .then(function(response){
        $scope.currentOrder = restLandingService.currentOrder;
      })
        .then(function(){
          $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
        })
};


})
