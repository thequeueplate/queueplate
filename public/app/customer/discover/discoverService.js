var app = angular.module('QueuePlate')

app.service('discoverService', function($http, $q) {

  this.restaurantsByName = function(restauraunts) {
    var deferred = $q.defer();
    $http({
      method: "GET",
      url: "/api/rests"
    }).then(function(response) {
      deferred.resolve(response.data)
       })
        return deferred.promise
        console.log(deferred.promise)
        console.log(response)
  }

  this.addFavoriteRestaurant = function() {
    this.post('/api/users/:userid')
  }
});