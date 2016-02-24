angular.module('app', [])

  .controller('BodyController',['$scope','$http',function($scope,$http){
    $http.get('http://192.168.1.159:8008/api/categorias')
    .success(function(data){

    });

      $scope.categorias=[{"_id":"56c4b2c6c0f5c9ec10016efd","title":"Atracciones Principales","description":"omitido","img":"56c4b2c6c0f5c9ec10016efc","__v":0},{"_id":"56c4b2dac0f5c9ec10016f00","title":"Actividades","description":"Omitido","img":"56c4b2dac0f5c9ec10016eff","__v":0},{"_id":"56c4b2eec0f5c9ec10016f03","title":"Restaurantes","description":"Omitido","img":"56c4b2eec0f5c9ec10016f02","__v":0},{"_id":"56c4b301c0f5c9ec10016f08","title":"Hoteles","description":"Omitido","img":"56c4b301c0f5c9ec10016f07","__v":0}];

  }])