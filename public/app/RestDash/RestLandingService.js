app.service('RestLandingService', function($http, $q){
  this.saveMenuData = function(Menu) {
    var deferred = $q.defer():
    $http({
      method: 'POST',
      url: '/api/MenuItem',
      data: 
    })
  }
})
