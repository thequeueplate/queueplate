
var app = angular.module('QueuePlate', ['ngAnimate', 'ngAria', 'ngMaterial','ui.router']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

$httpProvider.interceptors.push('AuthInterceptor');

$urlRouterProvider.otherwise('/');

 $stateProvider

   .state('home', {
     url: '/',
     templateUrl: 'app/home/home.html',
   })

   .state('login', {
     url: '/login',
     templateUrl: 'app/auth/login.html',
     controller: 'loginCtrl'
   })

  .state('signup', {
		url: '/signup',
		templateUrl: 'app/auth/signup.html',
		controller: 'signupCtrl'

	})

  .state('dashboard', {
		url: '/dashboard',
		templateUrl: 'app/dashboard/dashboard.html'

	})

 //  .state('RestLanding', {
	// 	url: '/RestLanding',
	// 	templateUrl: 'app/RestDash/RestLanding.html'
	// })

 //  .state('RestaurantCtrl', {
	// 	url: '/RestaurantCtrl',
	// 	templateUrl: 'app/RestDash/RestaurantTmpl.html'
	// })

  .state('registerCustomer', {
    url: '/registerCustomer/:id', 
    templateUrl: 'app/auth/registerCustomer.html',
    controller: 'registerCtrl',
    // resolve: {
    //   customerId: function(registerService){
    //     return registerService.register()
    //   }
    // }

  })

  .state('verify', {
      url: '/verify',
      templateUrl: 'app/auth/verify.html'
    })


$locationProvider.html5Mode(true);

});

app.run(function($state, $rootScope, $window, loginService) {

   $rootScope.$on('$stateChangeStart', function(event, toState) {
    
       var safeStates = ['home', 'signup', 'login', 'verify', 'registerCustomer'];

       var protected = safeStates.indexOf(toState.name) === -1;

     if (protected) {
      var token = $window.localStorage.token
         if (!token) {
           console.log('protected state, no token')
           event.preventDefault();
           return $state.go('home');
         } else {
          $rootScope.loggedIn = true;
          loginService.getUser()
          .then(function(data) {
            $rootScope.userInfo = data.data;
          });

         }
      }
   });
})
