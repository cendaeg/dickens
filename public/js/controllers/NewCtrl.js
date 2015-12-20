app.controller('NewCtrl', ['$scope', '$http', '$location', '$anchorScroll', '$rootScope','cities', function($scope, $http, $location, $anchorScroll, $rootScope, cities) {
  $scope.alerts = [];
  $scope.remove = function(array, index){
    array.splice(index, 1);
  }
  $scope.updatePhone = function(model) {
    var elem = $scope;
    model.forEach(function(text, i) {
      if(i==model.length-1 && elem[text]!==undefined) {
        elem[text] = elem[text].replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      } else {
        elem = elem[text];
      }
    });
  }
  var child_template = {
    name:"",
    age:"",
    age_type:"yrs",
    gender:"",
    shirt_size:"",
    school:"",
    notes:""
  };
  var others_template = {
    name:"",
    age:"",
  };
  $scope.newFamily = {
    children:[],
    others:[],
  };
  $scope.cities = cities;
  $scope.setCity = function() {
    for(i=0;i<$scope.cities.length;i++) {
      if($scope.cities[i].city==$scope.citySelect.city) {
        $scope.newFamily.city = $scope.cities[i].city;
        $scope.newFamily.zip = $scope.cities[i].zip;
        break;
      }
    }
  };
  var newChild = Object.create(child_template);
  $scope.newFamily.children.push(newChild);
  $scope.addChild = function() {
    var newChild = Object.create(child_template);
    $scope.newFamily.children.push(newChild);
  };
  $scope.addOther = function() {
    var newOther = Object.create(others_template);
    $scope.newFamily.others.push(newOther);
  };
  $scope.addFamily = function() {
    $scope.newFamily.new = true;
    $scope.newFamily.key = $(".key").val();
    $http.post('/api/family', $scope.newFamily)
    .success(function(data, status, headers, config) {
      if(data) {
        $scope.addAlert({type: 'success', msg: "This family was successfully added! <a href='#/edit/"+data.key+"'>Click to view.</a>"});
        $scope.newFamily = {
          children:[],
        };
      }
    })
    .error(function(data, status, headers, config) {
      if(status==409) {
        $scope.addAlert({type: 'danger', msg: "There is already an application with this key. <a href='#/edit/"+$scope.newFamily.key+"'>Click to view.</a>"})
      }
    });
  }
  $scope.addAlert = function(alert) {
    $scope.alerts.push(alert);
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  var blank = JSON.parse(JSON.stringify($scope.newFamily));
  $scope.$on('$locationChangeStart', function (event, next, current) {
    if(($scope.newFamily==blank)) return;
    var answer = confirm('You have unsaved work! Are you sure you want to leave?')
    if (!answer) {
      event.preventDefault();
    }
  });
}]);
