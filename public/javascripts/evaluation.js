/**
 * Created by PHI on 3/24/2015.
 */
var process=angular.module('evaluate',[]);
process.controller('list',function($scope,$http){
    $http.get('/api/user/find_evaluate')
        .success(function(data){
            if(data.type=="error"){
                $scope.dgmh_rp=data.content;
            }else{
                $scope.list=data;
            }
        }).error(function(data){
           console.log(data);
        });
}).controller('create',function($scope,$http){

});