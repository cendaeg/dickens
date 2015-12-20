app.controller('SettingsCtrl', ['$scope', '$http', 'Settings', function($scope, $http, Settings){
    Settings.get().success(function(data) {
        $scope.settings = data;
    });
    $scope.updateSettings = function() {
        console.log($scope.settings);
        Settings.set($scope.settings).success(function(data) {
            console.log(data);
        });
    }
}]);