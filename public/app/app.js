 var app = angular.module('QueuePlate', ['ui.router']);

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

$locationProvider.html5Mode(true);

});

app.run(function($state, $rootScope, $window, loginService) {

   $rootScope.$on('$stateChangeStart', function(event, toState) {
       var token = false;
       var safeStates = ['home', 'signup', 'login'];

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
