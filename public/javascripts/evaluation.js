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
                data.forEach(function(value){
                    $http.get('/api/findSubjectById/'+value.ma_mon)
                        .success(function(data){
                            if(data.type=="error"){
                                $scope.dgmh_rp=data.content;
                            }else{
                                var temp=data;
                                value.ma_mon_hoc=temp[0].ma_mon;
                                value.ten_mon=temp[0].ten_mon;
                            }
                        }).error(function(data){
                            console.log(data);
                        });
                });
                $scope.list=data;
            }
        }).error(function(data){
           console.log(data);
        });
    $scope.SubjectName=function(subjectId){
        $http.get('/api/findSubjectById/'+subjectId)
            .success(function(data){
                if(data.type=="error"){
                    $scope.dgmh_rp=data.content;
                }else{
                    return (data);

                }
            }).error(function(data){
                console.log(data);
            });
    }
}).controller('create',function($scope,$http){

});