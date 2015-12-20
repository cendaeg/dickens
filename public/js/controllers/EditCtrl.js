app.controller('EditCtrl', ['$scope', '$http', '$location', '$routeParams', 'dialogs', "$rootScope", 'cities', function($scope, $http, $location, $routeParams, dialogs, $rootScope, cities) {
  if($routeParams.id) {
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
    $scope.alerts = [];
    var blank;
    var key = $routeParams.id;
    $http.get("api/family/"+key).success(function(data, status, headers, config) {
      $scope.editFamily = data[0];
      blank = JSON.parse(JSON.stringify($scope.editFamily));
    });
    $scope.removeFamily = function(family) {
      var dlg = dialogs.confirm("Delete Confirmation", "Are you sure you want to delete "+$scope.editFamily.f_name+" "+$scope.editFamily.l_name+"?");
      dlg.result.then(function(btn){
        $http.delete("api/family/"+family.key).success(function(data, status, headers, config) {
          console.log(data);
          $location.path("/edit");
        })
        console.log("done");
      },function(btn){
        console.log("nope");
      });
    }
    $scope.$on('$locationChangeStart', function (event, next, current) {
      if(($scope.editFamily==blank)) return;
      var answer = confirm('You have unsaved work! Are you sure you want to leave?')
      if (!answer) {
        event.preventDefault();
      }
    });
  } else {
    $http.get("api/family").success(function(data, status, headers, config) {
      $scope.editList = data;
    });
    $(".locButton").click(function() {
      $(".locButton.active").removeClass("active");
      $(this).addClass("active");
      console.log($scope.search)
    })
  }
  var child_template = {
    name:"",
    age:"",
    age_type:"",
    gender:"",
    school:"",
    notes:""
  };
  var others_template = {
    name:"",
    age:"",
  };
  $scope.cities = cities;
  $scope.setCity = function() {
    for(i=0;i<$scope.cities.length;i++) {
      if($scope.cities[i].city==$scope.citySelect.city) {
        $scope.editFamily.city = $scope.cities[i].city;
        $scope.editFamily.zip = $scope.cities[i].zip;
        break;
      }
    }
  };
  var newChild = Object.create(child_template);
  $scope.addChild = function() {
    if(!$scope.editFamily.children) {
      $scope.editFamily.children = [];
    }
    var newChild = Object.create(child_template);
    $scope.editFamily.children.push(newChild);
  };
  $scope.addOther = function() {
    console.log($scope.editFamily)
    if(!$scope.editFamily.others) {
      $scope.editFamily.others = [];
    }
    var newOther = Object.create(others_template);
    $scope.editFamily.others.push(newOther);
  };
  $scope.updateFamily = function() {
    $scope.editFamily.edit = true;
    $scope.editFamily.key = $(".key").val();
    $http.post('/api/family', $scope.editFamily)
    .success(function(data, status, headers, config) {
      if(data) {
        $scope.addAlert({type: 'success', msg: "This family was successfully updated!"});
        $scope.editFamily = data;
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
}]);
