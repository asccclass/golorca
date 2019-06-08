angular.module('app', [
   'ngRoute',
   'ngCookies',
   'controllers'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/login', { controller: 'Login', templateUrl: 'views/login.html' })
   .when('/logout', { controller: 'Logout' })
   .when('/', { controller: 'Homepage', templateUrl: 'views/homepage.html' })
   .otherwise({ redirectTo: '/login' });
   // $locationProvider.html5Mode(true);
})
.run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {
   // keep user logged in after page refresh
   $rootScope.globals = $cookies.get('globals') || {};
   if($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
   }

   // redirect to login page if not logged in
   $rootScope.$on('$locationChangeStart', function(event, next, current) {
     if($location.path() !== '/login' && !$rootScope.globals.currentUser) {
        $location.path('/login');
     }
   });
}]);
