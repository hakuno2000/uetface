/**
 * Created by Phi on 3/30/2015.
 */
var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http){
    $http.get('./api/findTheoryClass')
        .success(function(data){
            $scope.theories=data;
            $http.get('./api/findPracticeClass')
                .success(function(data){
                    $scope.practices=data;
                }).error(function(data){
                    console.log(data);
                });
        }).error(function(data){
            console.log(data);
        });

});