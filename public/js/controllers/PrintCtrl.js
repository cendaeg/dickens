app
.controller('PrintCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {

}])
.controller('AddressCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $http.get('/api/family').success(function(data){
        $scope.labels = data;
    });
    $scope.dt1 = {};
    $scope.dt2 = {};
    $scope.today = function() {
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };
    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
    };
    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 0
    };
    $scope.format = 'yyyy-MM-dd';
    $scope.filterDate = function(item) {
        return ((new Date(item.added).setHours(0,0,0,0)>=$scope.dt1.setHours(0,0,0,0)) && (new Date(item.added).setHours(0,0,0,0)<=$scope.dt2.setHours(0,0,0,0)));
    }
}])
.controller('FullCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $scope.dt1 = {};
    $scope.dt2 = {};
    $scope.today = function() {
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };
    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
    };
    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 0
    };
    $scope.format = 'yyyy-MM-dd';
    $scope.filterDate = function(item) {
        return ((new Date(item.added).setHours(0,0,0,0)>=$scope.dt1.setHours(0,0,0,0)) && (new Date(item.added).setHours(0,0,0,0)<=$scope.dt2.setHours(0,0,0,0)));
    }
    $http.get('/api/family').success(function(data){
        $scope.pages = data;
    });
}])
.controller('BoxCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $scope.dt1 = {};
    $scope.dt2 = {};
    $scope.today = function() {
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };
    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
    };
    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 0
    };
    $scope.format = 'yyyy-MM-dd';
    $scope.filterDate = function(item) {
        return ((new Date(item.added).setHours(0,0,0,0)>=$scope.dt1.setHours(0,0,0,0)) && (new Date(item.added).setHours(0,0,0,0)<=$scope.dt2.setHours(0,0,0,0)));
    }
    $http.get('/api/family').success(function(data){
        $scope.families = data;
    });
}])
.controller('MasterCtrl', ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {
    $http.get('/api/family').success(function(data){
        $scope.families = data;
    });
}])
.controller('CertCtrl', ['$scope', '$http', '$location', '$filter', 'Settings', function($scope, $http, $location, $filter, Settings) {
    Settings.get().success(function(data, status, headers, config) {
        $scope.settings = data;
    });
    var d = new Date();
    var year = d.getFullYear();
    $scope.validUntil = "January 31, "+(year+1);
    $scope.certDated = "Dec. 24, "+year;
    $http.get('/api/family').success(function(data){
        var children = [];
        for(var i=0;i<data.length;i++) {
            for(var j=0;j<data[i].children.length;j++) {
                console.log(data[i]);
                data[i].children[j].added = data[i].added;
                data[i].children[j].key = data[i].key;
                children.push(data[i].children[j]);
            }
        }
        $scope.children = children;
    });
}]);
