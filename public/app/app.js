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

// app.run(function($stateProvider, $rootScope) {

//   $rootScope.$on('$stateChangeStart', function() {


//     loginService.getUser()
//       .then(function(data) {  
//         $scope.user = data.data;
//       });
//   });
// )
// })










