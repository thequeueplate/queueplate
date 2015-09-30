var app = angular.module('QueuePlate')

app.service('restLandingService', function($http, $q) {
  this.currentOrder;
  this.orderCust;
  this.getOrders = function(id) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: 'api/orders/rest/' + id
    }).then(function(response) {
      dfd.resolve(response.data);
    })
      return dfd.promise;
      console.log(dfd.promise);
  };

  this.setCurrentOrder = function(order) {
    var dfd = $q.defer();
    this.currentOrder = order;
    dfd.resolve("i done it.")
    return dfd.promise;
  }

  this.getOrderCust = function(){
    return $http.get('api/users/' + this.currentOrder.UserId)
  }

  this.updateStatus = function(id, status){
    console.log("BOINK", id, status)
    var dfd = $q.defer();
    $http({
      method: "PUT",
      url: "api/orders/order/" + id,
      data: {status: status}
    }).then(function(response){
      console.log(response);
      dfd.resolve(response);
    })
    return dfd.promise;
  }



});
