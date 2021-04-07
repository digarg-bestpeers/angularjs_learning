var app = angular.module('app', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/calc/:option?/:a?/:b?', {
        templateUrl: 'calc.html',
        controller: 'calcController'
    })
    .when('/', {
        template: "<strong>welcome to my app..</strong>"
    })
    .otherwise({
        template: "Click on left pannel to visit this app"
    })
}])


app.controller('calcController', ['$scope','dataService','$location','$routeParams','$route', function($scope,dataService,$location,$routeParams,$route){
    $scope.a = 0
    $scope.b = 0

    if($routeParams.a){
        $scope.a = $routeParams.a
    }

    if($routeParams.b){
        $scope.b = $routeParams.b
    }

    if($routeParams.option && $routeParams.a && $routeParams.b){
        if($routeParams.option == 'add'){
            $scope.isLoading = true
            dataService.add($scope.a,$scope.b).then(function(result){
                $scope.result = result;
                $scope.isLoading = false
            })
        }
        else if($routeParams.option == 'multiply'){
            $scope.isLoading = true
            dataService.multiply($scope.a,$scope.b).then(function(result){
                $scope.result = result;
                $scope.isLoading = false
            })
        }
        else{
            $location.url('/calc')
        }
    }

    $scope.doAdd = function(){
        var path = 'calc/add/' + $scope.a + '/' + $scope.b
        if(location.path == path){
            $location.reload()
        }
        else{
            $location.url(path)
        }
    }

    $scope.doMultiply = function(){
        var path = 'calc/multiply/' + $scope.a + '/' + $scope.b
        $location.url(path)
    }

    $scope.doUpdateResults = function(){
        $route.updateParams({
            a: $scope.a,
            b: $scope.b
        })
    }
}])