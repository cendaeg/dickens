app.factory('Settings', ['$http', function($http){
    return {
        get: function() { return $http.get("/settings"); },
        set: function(settings) {
            return $http.post("/settings", settings);
        }
    }
}])