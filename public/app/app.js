var app = angular.module('QueuePlate', ['ngAnimate', 'ngAria', 'ngMaterial','ui.router', 'ui.mask', 'ngCookies']);

app.config(function($mdThemingProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

$mdThemingProvider.theme('default')
    .primaryPalette('light-blue', {
      'default': '700',
      'hue-1' : '400',
      'hue-2' : '200',
      'hue-3' : '50'
    })
    
    .accentPalette('deep-orange', {
      'default' : '700',
      'hue-1'   : '400',
      'hue-2'   : '200',
      'hue-3'   : '50'
    })

    .warnPalette('red', {
      'default' : '700',
      'hue-1'   : '400',
      'hue-2'   : '200',
      'hue-3'   : '50'
    })

$httpProvider.interceptors.push('AuthInterceptor');

$urlRouterProvider.otherwise('/');

 $stateProvider

   .state('home', {
     url: '/',
     templateUrl: 'app/home/home.html',
   })

   .state('loginBoth', {
     url: '/login',
     templateUrl: 'app/auth/login.html',
     controller: 'loginCtrl'
   })

  .state('signUpBoth', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'signupCtrl'

  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/customer/dashboard/dashboard.html',
    controller: 'dashboardCtrl',
    resolve: {
      UID: function(loginService) {
        return loginService.getUserData();
      }
    }
  })

  .state('registerRestaurant', {
    url: '/registerRestaurant/:id',
    templateUrl: 'app/auth/registerRestaurant.html',
    controller: 'registerCtrl',
     resolve: {
      UID: function($stateParams) {
        return $stateParams.id
      },
      publishData: function(registerService, $stateParams) {
        return registerService.checkVerified($stateParams.id)
      }
    }
  })

  .state('RestaurantLanding', {
   url: '/RestaurantLanding',
   templateUrl: 'app/RestDash/RestaurantTmpl.html',
   controller: 'RestLandingCtrl',
   resolve: {
     restData: function(loginService){
       return loginService.getRestData();
     },
     orders: function(restData, restLandingService){

      return restLandingService.getOrders(restData.id);
     }
   }
  })

  .state('RestaurantLanding.orderDetails', {
    url: '/:orderId',
    templateUrl: 'app/RestDash/OrderDetailsTmpl.html',
    controller: 'OrderDetailsCtrl',
    resolve: {
      cust: function(restLandingService, $stateParams){
        return restLandingService.getOrderCust()
      }
    }
  })


  .state('ManageMenu', {
   url: '/ManageMenu',
   templateUrl: 'app/RestDash/Menu.html',
   controller: 'MenuController',
   resolve: {
    restData: function(loginService){
      return loginService.getRestData();
    }
  }
  })

   .state('registerCustomer', {
    url: '/registerCustomer/:id',
    templateUrl: 'app/auth/registerCustomer.html',
    controller: 'registerCtrl',
    resolve: {
      UID: function($stateParams) {
        return $stateParams.id
      },
      publishData: function(registerService, $stateParams) {
        return registerService.checkVerified($stateParams.id)
      }

    }

  })

  .state('verify', {
      url: '/verify',
      templateUrl: 'app/auth/verify.html'
    })

  .state('signUpCustomer', {
    url: '/signupcustomer',
    templateUrl: 'app/auth/customersignup.html',
    controller: 'signupCtrl'
  })

  .state('signUpRestaurant', {
    url: '/signuprestaurant',
    templateUrl: 'app/auth/restsignup.html',
    controller: 'signupCtrl'
  })


   .state('discover', {
    url: '/discover',
    templateUrl: 'app/customer/discover/discover.html',
    controller: 'discoverCtrl'
   })

    .state('shoppingCart', {
    url: '/shoppingCart',
    templateUrl: 'app/customer/shoppingCart/shoppingCart.html',
    controller: 'shoppingCartCtrl'
  })

  .state('MenuItems', {
    url: '/MenuItems',
    templateUrl: 'app/RestDash/MenuItems.html',
    controller: 'MenuItemsCtrl',
    resolve: {
     restData: function(loginService){
       return loginService.getRestData();
     },
     menu: function(MenuService){
       return MenuService.getCurrentMenu();
     }
    }

  })

  .state('RestaurantMenu', {
    url: '/Restaurant/:restid/Menu',
    templateUrl: 'app/customer/menu/RestaurantMenu.html', 
    controller: 'RestaurantMenuCtrl',
     resolve: {
      RID: function($stateParams) {
        return $stateParams.restid
      }
    }
  })

$locationProvider.html5Mode(true);

});

app.run(function($state, $rootScope, $window, loginService) {

   $rootScope.$on('$stateChangeStart', function(event, toState) {

       var safeStates = ['home', 'signUpBoth', 'loginBoth', 'verify', 'registerCustomer', 'registerRestaurant', 'signUpCustomer', 'signUpRestaurant', 'RestaurantLanding', 'ManageMenu', 'RestaurantMenu'];

       var protectedState = safeStates.indexOf(toState.name) === -1;

     if (protectedState) {
      var token = $window.localStorage.token
         if (!token) {
           console.log('protected state, no token')
           event.preventDefault();
           
           return $state.go('loginBoth');
         } else {
          loginService.getUser()
          .then(function(data) {
            
          });

         }
      }
   });
})

