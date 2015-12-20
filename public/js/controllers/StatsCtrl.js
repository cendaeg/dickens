app.controller('StatsCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', function($scope, $http, $location, $routeParams, $filter) {
    var familiesByCityCtx = document.getElementById("familiesByCity").getContext("2d");
    $http.get("api/family").success(function(data, status, headers, config) {
        $scope.families = data;
        var Greensburg = $filter('filter')(data, {city: "Greensburg"});
        var Westport = $filter('filter')(data, {city: "Westport"});
        var StPaul = $filter('filter')(data, {city: "St. Paul"});
        var NewPoint = $filter('filter')(data, {city: "New Point"});
        var Batesville = $filter('filter')(data, {city: "Batesville"});
        var Milroy = $filter('filter')(data, {city: "Milroy"});
        var Rushville = $filter('filter')(data, {city: "Rushville"});
        var Hartsville = $filter('filter')(data, {city: "Hartsville"});
        var cityData = {
            labels: ["Greensburg","Westport","St. Paul","New Point","Batesville","Milroy","Rushville","Hartsville"],
            datasets: [
            {
                label: "Families Per City",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [ Greensburg.length, Westport.length,StPaul.length,NewPoint.length,Batesville.length,Milroy.length,Rushville.length,Hartsville.length]
            }
            ]
        };
        var FamiliesPerCity = new Chart(familiesByCityCtx).Bar(cityData);
    });
    $http.get("api/children").success(function(data, status, headers, config) {
        $scope.children = data;
    });
}]);