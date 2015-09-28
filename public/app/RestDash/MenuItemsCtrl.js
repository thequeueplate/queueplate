app.controller('MenuItemsCtrl', function($scope, MenuService, menu, restData){
    $scope.restData = restData;
    $scope.menu = menu;

    $scope.addMenuItem = function(){
        console.log($scope.newItem);
        MenuService.addMenuItem($scope.newItem, restData.id)
            .then(function(response){
                console.log(response)
                MenuService.getMenu(restData.id)
                    .then(function(response){
                        console.log(response);
                        $scope.menu = response.data[0];
                        $scope.newItem = {};
                    })
            })
    }
})