angular.module('OAuth', [])
.controller('Login', ['$scope', '$rootScope', '$location', '$cookies', '$http',
   function($scope, $rootScope, $location, $cookies, $http) {

   $scope.Login = function() {
      var username = 'andyliu';
      var password = 'test@test';
      var authdata = 'sdfsf23432#$%%dsfasfsd^^^'; // Base64.encode(username + ':' + password);
      //$http.post('/api/authenticate', { username: username, password: password })
      //    .success(function (response) {
      //        callback(response);
      //    });
      $rootScope.globals = {
         currentUser: { username: username, authdata: authdata }
      };
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
      $cookies.put('globals', $rootScope.globals);
      $location.path('/');
   };

}])
.controller('Logout', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
   $scope.logout = function() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic ';
   };
   $scope.logout();
}])
;
