var app = angular.module('QueuePlate')

app.service('restLandingService', function($http, $q) {
  this.currentOrder;
  this.orderUser;
  this.getOrders = function(id) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/orders/rest/' + id
    }).then(function(response) {
      dfd.resolve(response.data);
    });
      return dfd.promise;
  };

  //http://localhost:3000/api/users?id=1
  this.getOrderUser = function(userId) {
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: '/api/users?id=' + userId
    }).then(function(response) {
      this.orderUser = response.data[0];
      dfd.resolve(response);
    })
    return dfd.promise;
  }

  this.sampleOrders = [
    {
      name: 'Mark Keysor',
      address: '649 S. 300 E.',
      phone: '8018311058',
      dishes: ['Blooming Onion'],
      comments: 'Keep em coming!',
      id: 1
    },
    {
      name: 'Eric Richards',
      address: 'Dumb S. Stupid E.',
      phone: '8011234567',
      dishes: ['Burger Bunz', 'Fry Bunz'],
      comments: 'I love them burger bunz!',
      id: 2
    }
  ]

  this.setCurrentOrder = function(order) {
    var dfd = $q.defer();
    this.currentOrder = order;
    dfd.resolve("i done it.")
    return dfd.promise;
  }

});
