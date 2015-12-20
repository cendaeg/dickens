app.controller('NavCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
     $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path().substr(0,viewLocation.length);
    };
}]);
