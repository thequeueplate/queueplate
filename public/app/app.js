
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
    templateUrl: 'app/dashboard/dashboard.html',
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
   controller: 'RestLandingCtrl'
  })


  .state('ManageMenu', {
   url: '/ManageMenu',
   templateUrl: 'app/RestDash/Menu.html',
   controller: 'MenuController'
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

  .state('MenuItems', {
    ulr: '/MenuItems',
    templateUrl: 'app/RestDash/MenuItems.html',
    controller: 'MenuItemsCtrl'
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
