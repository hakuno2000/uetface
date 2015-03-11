/**
 * Created by PHI on 3/1/2015.
 */
var process=angular.module('class',[]);
process.controller('classController',function($scope,$http){
    $http.get('/admin/class/api')
        .success(function(data){
            $scope.number_page=data.number_page;
            $scope.classes=data.rows;
        }).error(function(data){
            console.log(data);
        });
    $scope.setPage=function(n){
        if(n<=3){
            $scope.page_num=n;
            if(n<=3) $scope.page_show=1;
        }else if(n>=$scope.number_page-3){
            $scope.page_num=n;
            if(n>=$scope.number_page-3) $scope.page_show=$scope.number_page-4;
        }
        else{
            $scope.page_num=n;
            $scope.page_show=n-2;
        }
        $http.get('/admin/class/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
                if($scope.page_num>$scope.number_page){
                    $scope.page_num=$scope.number_page;
                    $scope.page_show=$scope.number_page-4;
                }
                if($scope.page_show+4>$scope.number_page){
                    $scope.page_show=$scope.number_page-4;
                }
                $scope.check();
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Prev=function(){
        if($scope.page_num-1<1){

        }else{
            $scope.page_num=$scope.page_num-1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show-1;
            }else if($scope.page_num-$scope.page_show<0){
                $scope.page_show=$scope.page_num;
            }
        }
        $http.get('/admin/class/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.check();
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.Next=function(){
        if($scope.page_num+1>$scope.number_page){

        }else{
            $scope.page_num=$scope.page_num+1;
            if($scope.page_num>=2&&$scope.page_num<=$scope.number_page-4){
                $scope.page_show=$scope.page_show+1;
            }else if($scope.page_num-$scope.page_show>4){
                $scope.page_show=$scope.page_num-4;
            }
        }
        $http.get('/admin/class/api?page_num='+$scope.page_num+'&page_length='+$scope.page_length)
            .success(function(data){
                $scope.classes=data.rows;
                $scope.number_page=data.number_page;
                $scope.check();
            }).error(function(data){
                console.log(data);
            });
    }
    $scope.check=function(){
        if($scope.page_show==$scope.page_num){
            $scope.active1='active';
            $scope.active2=$scope.active3=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==1){
            $scope.active2='active';
            $scope.active1=$scope.active3=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==2){
            $scope.active3='active';
            $scope.active1=$scope.active2=$scope.active4=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==3){
            $scope.active4='active';
            $scope.active1=$scope.active3=$scope.active2=$scope.active5='';
        }else if($scope.page_num-$scope.page_show==4){
            $scope.active5='active';
            $scope.active1=$scope.active3=$scope.active4=$scope.active2='';
        }
    }
    $scope.check();
});