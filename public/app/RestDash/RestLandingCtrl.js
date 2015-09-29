var app = angular.module('QueuePlate')

app.controller('RestLandingCtrl', function($scope, $cookies, $rootScope, registerService, $state, loginService, restLandingService, restData, orders){
  console.log("THIS REST IS THE BEST",restData);
  console.log("ORDERS ORDASDFIPOJ", orders);

  
   




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

  $scope.incomingOrders = orders;

  // $scope.order = {
  //   name: order.name,
  //   address: order.address,
  //   phone: order.phone,
  //   dishes: [],
  //   comments: order.comments
  // };

  // $scope.selectedOrders = function(order) {
  //   $scope.sampleOrders = order;
  //   console.log(order);
  // };

  //This boi sets the current order AND the current user.
  $scope.selectedOrders = function(order) {
    console.log("this is the order!", order)
    restLandingService.getOrderUser(order.UserId)
      .then(function(response){
        $scope.user = response.data[0]
        console.log(response.data[0])
        restLandingService.setCurrentOrder(order)
          .then(function(response){
            console.log(response);
            $state.go('RestaurantLanding.orderDetails', {orderId: order.id});
          })
      })
  };

})
