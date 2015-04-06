/**
 * Created by Phi on 3/30/2015.
 */
var user=angular.module('user',[]);
user.controller('timetable',function($scope,$http,$q){
    $http.get('/api/user/find_class')
        .success(function(data){
            $scope.theories=data[0];
            $scope.practices=data[1];
        }).error(function(data){
            console.log(data);
        });
});