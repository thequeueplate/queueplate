var app = angular.module('QueuePlate', ['ngAnimate', 'ngAria', 'ngMaterial','ui.router', 'ui.mask', 'ngCookies']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

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
    controller: 'dashboardCtrl'

  })

  .state('registerRestaurant', {
    url: '/registerRestaurant/:id',
    templateUrl: 'app/auth/registerRestaurant.html',
    controller: 'registerCtrl',
    resolve: {
      UID: function(registerService, $stateParams) {
        return $stateParams.id
      },
      publishData: function(registerService, $stateParams) {
        return registerService.checkVerifiedRestaurant($stateParams.id)
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
     orders: function(restLandingService, loginService){
       return restLandingService.getOrders(loginService.getRestData().id);
     }
   }
  })

  .state('RestaurantLanding.orderDetails', {
    url: '/:orderId',
    templateUrl: 'app/RestDash/OrderDetailsTmpl.html',
    controller: 'OrderDetailsCtrl'
    // resolve: {
    //   currentOrder: function(RestLandingService, $stateParams) {
    //     return RestLandingService($stateParams);
    //   }
    // }
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
    //  menu: function(menuService, loginService){
    //    return menuService.getMenu(loginService.getRestData().id);
    //  }

  })

   .state('registerCustomer', {
    url: '/registerCustomer/:id',
    templateUrl: 'app/auth/registerCustomer.html',
    controller: 'registerCtrl',
    resolve: {
      UID: function(registerService, $stateParams) {
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

   .state('checkout', {
    url: '/checkout',
    templateUrl: 'app/customer/checkout/checkout.html',
    controller: 'checkoutCtrl'
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
    templateUrl: 'app/RestDash/PublicMenu.html'


  })

$locationProvider.html5Mode(true);

});

app.run(function($state, $rootScope, $window, loginService) {

   $rootScope.$on('$stateChangeStart', function(event, toState) {

       var safeStates = ['home', 'signUpBoth', 'loginBoth', 'verify', 'registerCustomer', 'registerRestaurant', 'signUpCustomer', 'signUpRestaurant', 'RestaurantLanding', 'ManageMenu'];

       var protected = safeStates.indexOf(toState.name) === -1;

     if (protected) {
      var token = $window.localStorage.token
         if (!token) {
           console.log('protected state, no token')
           event.preventDefault();
            $rootScope.loggedIn = false;
           return $state.go('loginBoth');
         } else {
          $rootScope.loggedIn = true;
          loginService.getUser()
          .then(function(data) {

          });

         }
      }
   });
})

// app.filter.('phoneNumber', function() {
//   return function(input, uppercase) {
//     input = input || '';
//     var phoneNumber = "";
//     for (var i = 0; i < input.length; i++) {
//       phoneNumber = input.charAt(0) + "(";
//       phoneNumber = input.charAt(3) + ")"
//       phoneNumber = input.charAt()
//     }
//     // conditional based on optional argument
//     if (uppercase) {
//       out = out.toUpperCase();
//     }
//     return out;
//   };
// })
