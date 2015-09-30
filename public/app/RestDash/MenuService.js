app.service('MenuService', function($http, $q, loginService){
    var menu;
    this.getMenu = function(id) {
      var dfd = $q.defer()
      $http.get('/api/rests/' + id + '/menu')
        .then(function(response){
          menu = response.data[0];
          dfd.resolve(response);
        })
      return dfd.promise;
    }

    this.getCurrentMenu = function() {
      return menu;
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

    this.addMenuItem = function(item, restId){
      return $http({
        method: "POST",
        url: "api/rests/" + restId + "/items/" + item.section,
        data: item
      })
    }
})
