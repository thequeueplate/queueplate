app.service('MenuService', function($http, $q, loginService){

    this.getMenu = function(id) {
      var dfd = $q.defer()
      $http.get('/api/rests/' + id + '/menu')
        .then(function(response){
          console.log(response)
          dfd.resolve(response)
        })
      return dfd.promise;
    }

    this.addSection = function(restId, menuId, section){
      console.log(restId, menuId);
      console.log("SECTION", section);
      return $http({
        method: 'POST',
        url: '/api/rests/' + restId + '/sections/' + menuId,
        data: section
      })
    }




})
