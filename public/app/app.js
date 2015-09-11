var app = angular.module('QueuePlate', ['ui.router']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

 $urlRouterProvider.otherwise('/');

 $stateProvider
   .state('home', {
     url: '/',
     templateUrl: 'app/views/pages/home.html',
 
   })

   .state('login', {
     url: '/login',
     templateUrl: 'app/views/pages/login.html',
     controller: 'authCtrl'
   })

  .state('signup', {
		url: '/signup',
		templateUrl: 'app/views/pages/signup.html',
		controller: 'SignUpCtrl',
		controllerAs: 'vm'
	})

.state('homeuser', {
		url: '/homeuser',
		templateUrl: 'app/views/pages/homeuser.html'
	})

$locationProvider.html5Mode(true);

});