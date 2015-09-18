app.service('mainService', function($http, $q){

  this.saveData = function(restaurant) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/restaurant',
      data: restaurant          ///////// have some people look at this!!!!!
    }).then(function(response) {
      deferred.resolve(response)
    })
    return deferred.promise;
  }

  this.getOrder = function(){
    return $http.get("/api/orders")
  }
})
