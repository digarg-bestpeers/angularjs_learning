var app = angular.module("app", ['ngRoute'])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/calc', {
        templateUrl: 'calc.html',
        controller: 'calcController'
    })
    .when('/calc/add/:a/:b', {
        templateUrl: 'resultcalc.html',
        controller: 'calcAddController'
    })
    .when('/calc/multiply/:a/:b', {
        templateUrl: 'resultcalc.html',
        controller: 'calcMultiplycontroller'
    })
    .when('/', {
        template: "<strong>Welcome to my app</strong>"
    })
    .otherwise({
        template: "Click on left Pannel.."
    })
}])


app.controller('calcController', ['$scope','$location', function($scope,$location){
    $scope.a = 0;
    $scope.b = 0;

    $scope.doAdd = function(){
        var path = '/calc/add/' + $scope.a + '/' + $scope.b
        $location.url(path)
    }

    $scope.doMultiply = function(){
        var path = '/calc/multiply/' + $scope.a + '/' + $scope.b
        $location.url(path)
    }
}])

app.controller('calcAddController', ['$scope','dataService','$routeParams', function($scope,dataService,$routeParams){
    $scope.isLoading = true;
    dataService.add($routeParams.a,$routeParams.b).then(function(result){
        $scope.result = result;
        $scope.isLoading = false;
    })
}])


