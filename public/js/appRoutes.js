app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainCtrl'
  })
  .when('/new', {
    templateUrl: 'views/new.html',
    controller: 'NewCtrl'
  })
  .when('/edit', {
    templateUrl: 'views/editList.html',
    controller: 'EditCtrl'
  })
  .when('/edit/:id', {
    templateUrl: 'views/edit.html',
    controller: 'EditCtrl'
  })
  .when('/print', {
    templateUrl: 'views/print.html',
    controller: 'PrintCtrl'
  })
  .when('/print/address', {
    templateUrl: 'views/addressLabels.html',
    controller: 'AddressCtrl'
  })
  .when('/print/full', {
    templateUrl: 'views/fullSheets.html',
    controller: 'FullCtrl'
  })
  .when('/print/box', {
    templateUrl: 'views/boxLabels.html',
    controller: 'BoxCtrl'
  })
  .when('/print/master', {
    templateUrl: 'views/masterList.html',
    controller: 'MasterCtrl'
  })
  .when('/print/certificates', {
    templateUrl: 'views/certificates.html',
    controller: 'CertCtrl'
  })
  .when('/stats', {
    templateUrl: 'views/stats.html',
    controller: 'StatsCtrl'
  })
  .when('/settings', {
    templateUrl: 'views/settings.html',
    controller: 'SettingsCtrl'
  })
}]);
