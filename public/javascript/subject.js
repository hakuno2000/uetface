/**
 * Created by Phi on 2/16/2015.
 */
var process=angular.module('listclass',[]);
process.controller('classController',function($scope,$filter,$http){
    var orderBy = $filter('orderBy');
    $scope.order = function(predicate, reverse) {
        $scope.classes = orderBy($scope.classes, predicate, reverse);
    };
    $scope.order('-ma_mon',false);
    $http.get('/admin/subject/api')
        .success(function(data){
            $scope.classes=data;
        }).error(function(data){
            console.log(err);
        });
});