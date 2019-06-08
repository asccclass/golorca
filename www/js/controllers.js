angular.module('controllers', [
   "OAuth"
])
.controller('Homepage', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
   $scope.user = $rootScope.globals.currentUser;

}])
;
